const express = require('express');

const validateName = require('./middlewares/validateName');
const validatePrice = require('./middlewares/validatePrice');
const validateDescription = require('./middlewares/validateDescription');
const validateCreatedAt = require('./middlewares/validateCreatedAt');
const validateDifficulty = require('./middlewares/validateDifficulty');
const validateRating = require('./middlewares/validateRating');
const generateToken = require('./utils/generateTokens');
const auth = require('./middlewares/auth');

const path = require('path');
const fileActivities = path.resolve('src', 'data', 'activities.json');
const filePerson = path.resolve('src', 'data', 'person.json');
const { readFile, writeFile } = require('./middlewares/fs');
const { write } = require('fs');

const app = express();

app.use(express.json());



app.post('/activities',
validateName,
validateDifficulty,
validateRating,
validateCreatedAt,
validateDescription,
validatePrice,
 async (req, res) => {
   const file = await (readFile(fileActivities));

  const { name, price, description } = req.body;

  const newActivit = {
    name,
    price,
    description: {
      rating: description.rating,
      difficulty: description.difficulty,
      createdAt: description.createdAt
    }
  };

  file.push(newActivit);

  await writeFile(fileActivities, file);

  res.status(201).json({ message: 'Atividade registrada com sucesso!' });
})

app.post('/sigup', async (req, res) => {
  const file  = await readFile(filePerson);
  const body = req.body;

  if([body.email, body.password, body.firstName, body.phone].includes(undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  file.push(body);
  await writeFile(filePerson, file)
  const token = generateToken();

  res.status(200).json({ token });
})
module.exports = app;