const path = require('path');
const fs = require('fs');
const Benchmark = require('benchmark');
const outputToJson = require('./outputHandler');
const suite = new Benchmark.Suite;

// read files from /suites directory
const testDir = path.join(__dirname, 'suites');
fs.readdir(testDir, (err, files) => {
  let availableTests = [];
 if(err) {
   throw Error(`fail to read directory ${testDir}`)
 }
 files.forEach((file) => {
   if(/^suite\./.test(file)) {
      availableTests.push(path.join(testDir, file))
   }  
 })
 runTests(availableTests)
})

function runTests(testPaths) {
  for(let test of testPaths) {
    let currentTest = require(test);
    suite.add(currentTest.name, function() {
      currentTest.executor();
    })
  }
  // add listeners
  suite.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    let output = [];
    this.map((item) => {
      output.push({
        name: item.name, 
        opsSec: item.hz, 
        errMargin: item.stats.rme, 
        runs: item.stats.sample.length})
    })
    outputToJson(output, () => {
      console.log('output file written')
    });
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
}
// const suiteA = require('./suiteA');
// const suiteB = require('./suiteB');
// const suiteC  = require('./suiteC');


// // add tests
// suite.add('WithPromiseChunk', function() {
//   suiteA();
// })
// .add('WithAsyncGenerator', function() {
//   suiteB();
// })
// .add('WithGeneratorTracker', function() {
//   suiteC();
// })
// // add listeners
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   let output = [];
//   this.map((item) => {
//     output.push({
//       name: item.name, 
//       opsSec: item.hz, 
//       errMargin: item.stats.rme, 
//       runs: item.stats.sample.length})
//   })
//   outputToJson(output, () => {
//     console.log('output file written')
//   });
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// // run async
// .run({ 'async': true });
