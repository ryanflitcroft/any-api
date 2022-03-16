const { Router } = require('express');
const pool = require('../utils/pool');
const Album = require('../models/Album');

module.exports = Router()
  .post('/', async (req, res) => {
    const album = await Album.insert(req.body);
    res.json(album);
  })

  .get('/', async (req, res) => {
    const albums = await Album.getAll();
    res.json(albums);
  })

  .get('/:id', async (req, res) => {
    const album = await Album.getById(req.params.id);
    res.json(album);
  })

  .patch('/:id', async (req, res) => {

  })

  .delete('/:id', async (req, res) => {
    const album = await Album.deleteById(req.params.id);
    res.json(album);
  });
