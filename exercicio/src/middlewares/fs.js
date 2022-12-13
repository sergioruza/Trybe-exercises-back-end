const fs = require('fs').promises;

const readFile = async (route) => {
  const data = await fs.readFile(route, 'utf-8');
  return JSON.parse(data);
}

const writeFile = async (route, data) => {
  await fs.writeFile(route, JSON.stringify(data, null, 2));
    return true;
}

module.exports = { readFile, writeFile };