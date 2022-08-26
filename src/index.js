const express = require('express');
const bodyParser = require('body-parser');
const talkerManager = require('./talkerManager');
const { generateToken } = require('./utils/generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateAuthorization = require('./middlewares/validateAuthorization');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await talkerManager.getAllTalkers();
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerManager.getAllTalkers();
  const talkerId = talker.find((t) => t.id === Number(id));
  if (talkerId) {
    return res.status(HTTP_OK_STATUS).json(talkerId);
  }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  // const { email, password } = req.body;
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  validateTalk,
  validateAuthorization,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  talkerManager.addNewTalker,
);

app.listen(PORT, () => {
  console.log('Online');
});
