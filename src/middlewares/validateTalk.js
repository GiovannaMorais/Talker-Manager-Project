// const validateWatchedAt = require('./validateWatchedAt');
// const validateRate = require('./validateRate');

// const validation = () => {
// const result = validateWatchedAt && validateRate;
// return result;
// };

const validateTalk = (req, res, next) => {
const { talk } = req.body;

if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
}
// validation();

next();
};
module.exports = validateTalk;