const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /\S+@\S+\.\S+/;
  const validated = validEmail.test(email);

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validated) {
    return res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
  }
  next();
};
module.exports = validateEmail;
