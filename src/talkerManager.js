const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const readTalkerManager = async () => {
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
  const addNewTalker = async (req, res) => {
    const talkerReq = req.body;
    const talkersList = await readTalkerManager();
    const newTalker = { id: talkersList.length + 1, ...talkerReq };
    talkersList.push(newTalker);
    fs.writeFile(path, JSON.stringify(talkersList));
    return res.status(201).json(newTalker);
};

module.exports = {
    getAllTalkers,
    addNewTalker,
};