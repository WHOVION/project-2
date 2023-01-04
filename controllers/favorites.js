const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET add user: res.locals.user

// GET /favorites - return a page with favorite songs
// READ function to find all favorited songs
router.get('/', async (req, res) => {
    try {
      // TODO: Get all records from the DB and render to view
      const favSong = await db.songs.findAll()
      res.render('faves.ejs', {
        songs: songs
      });
    } catch (error) {
      console.log(error)
    }
  });
  
  // POST /favorites - receive the name of the song and add it to database
  // POST is add
  // PUT is update
  router.post('/', async (req, res) => {
    try {
      const songs = await db.songs.findOrCreate({
        where: {
          // body not referencing body, think of body as a data
          name: req.body.name
        }
      })
    } catch (error) {
      console.log(error)
    }
    // TODO: Get form data and add a new record to DB
    // figure out reason of params
    res.redirect('/favorites');
  });
  
  router.get('/:name', async (req, res) => {
    try {
      const url = `https://itunes.apple.com/us/rss/topsongs/limit=100/json${req.params.name}`
      const response = await axios.get(url)
      res.render('faves.ejs', {
        songs: response.data,
        name: req.params.name,
        user: res.locals.user
      })
      // console.log(response.data)
    } catch (error) {
      console.log(error)
      res.status(500).send('api error')
    }
  })



  

module.exports = router;
