const fs = require("fs");

async function writeToJsonFile(_data, fileName) {
  let result = {
    data: _data,
  };

  let data = JSON.stringify(result);
  fs.writeFileSync(`./data/${fileName}.json`, data);
}

module.exports = {
    writeToJsonFile
}