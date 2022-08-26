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
    const { name, age, talk } = req.body;
    console.log('req.body', req.body);
    // const talkerReq = req.body;
    const talkersList = await getAllTalkers();
    const newTalker = { id: talkersList.length + 1, name, age, talk };
    // talkersList.push(newTalker);
    const allTalkers = [...talkersList, newTalker];
    await fs.writeFile(join(__dirname, path), JSON.stringify(allTalkers));
    return res.status(201).json(newTalker);
};

module.exports = {
    getAllTalkers,
    addNewTalker,
};