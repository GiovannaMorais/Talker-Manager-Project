const fs = require('fs').promises;
const { join } = require('path');

const readTalkerManager = async () => {
    const path = './talker.json';
    try {
        const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
        return JSON.parse(contentFile);
    } catch (error) {
        console.error(error);
        return error.message; 
    }
};

const getAllTalkers = async () => {
    const talkers = await readTalkerManager();
    return talkers;
  };

module.exports = {
    getAllTalkers,
};