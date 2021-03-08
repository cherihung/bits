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

// loop thru test file paths and execute
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
    const fastestByIds = this.filter('fastest').map('id');
    let output = [];
    this.map((item) => {
      let isFastest = fastestByIds.includes(item.id);
      output.push({
        isFastest,
        name: item.name, 
        opsSec: item.hz, 
        errMargin: item.stats.rme, 
        runs: item.stats.sample.length})
    })
    outputToJson(output, (fileName) => {
      console.log(`result file ${fileName} written`)
    });
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
}
