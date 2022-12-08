const { json } = require('express');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

const movies = path.resolve(__dirname, './movies.json');

app.use(express.json());

const readFile = async () => {
  try {
    const data = await fs.readFile(movies);
    return JSON.parse(data);
  } catch(err) {
    console.log(`Arquivo não pode ser lido: ${err}`)
  }
}

app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await readFile();
    const find = movie.find((e) => e.id === +req.params.id);
    return res.status(200).json(find);
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
})

app.get('/movies', async (req, res) => {
  try {
    const movies = await readFile();
    return res.status(200).json(movies);
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
})

app.post('/movies', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const movieFile = await readFile();
    const newMovie = {
      id: movieFile[movieFile.length - 1].id + 1,
      movie,
      price,
    };
    const allMovies = JSON.stringify([...movieFile, newMovie]);
    await fs.writeFile(movies, allMovies);
    res.status(201).json(newMovie);
  } catch {
    res.status(500).send({ message: err.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const  { id } = req.params;
    const moviesFile = await readFile();
    const index = moviesFile.findIndex((e) => e.id === +id);
    movies[index] = {id: +id, movie, price};
    const update = JSON.stringify(moviesFile, null, 22);
    await fs.writeFile(movies, update);
    res.status(200).json(moviesFile[index]);
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movieFile = await readFile();
    const filter = movieFile.filter((e) => e.id !== +id);
    const update = fs.writeFile(movies, filter);
    res.status(200).end();
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = app;