const fs = require('fs').promises;

const readJsonFile = async (fileName) => {
    const dataJson = await fs.readFile(fileName);

    const data = await JSON.parse(dataJson);

    return data;
};

module.exports = readJsonFile;