const fs = require('fs');
const path = require('path');

function outputToJson(data, callback) {
  const jsonData = JSON.stringify(data);
  const dateNow = new Date().valueOf();
  const resultsFile = path.join(__dirname, 'results', `result.${dateNow}.json`);
  fs.writeFile(resultsFile, jsonData, 'utf8', callback)
}

module.exports = outputToJson;