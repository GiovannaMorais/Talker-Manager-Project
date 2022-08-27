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
    const talkersList = await getAllTalkers();
    const newTalker = { id: talkersList.length + 1, name, age, talk };
    // talkersList.push(newTalker);
    const allTalkers = [...talkersList, newTalker];
    await fs.writeFile(join(__dirname, path), JSON.stringify(allTalkers));
    return res.status(201).json(newTalker);
};

const changedTalkers = async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkersList = await getAllTalkers();

    const talker = talkersList.find((t) => t.id === Number(id));
    // console.log('talker', talker);
    if (talker) {
        const index = talkersList.indexOf(talker);
        const editTalker = { id: Number(id), name, age, talk };
        talkersList.splice(index, 1, editTalker);
        await fs.writeFile(join(__dirname, path), JSON.stringify(talkersList));
        return res.status(200).json(editTalker);
      } 
        return res.sendStatus(400);
    };

    const deleteTalkers = async (req, res) => {
        const { id } = req.params;
        const talkersList = await getAllTalkers();

    const talker = talkersList.find((t) => t.id === Number(id));
    if (talker) {
        const index = talkersList.indexOf(talker);
        talkersList.splice(index, 1);
        await fs.writeFile(join(__dirname, path), JSON.stringify(talkersList));
        return res.status(204).json(talkersList);
    }
    };

module.exports = {
    getAllTalkers,
    addNewTalker,
    changedTalkers,
    deleteTalkers,
};