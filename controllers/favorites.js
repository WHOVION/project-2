const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// for GET -- add,  user: res.locals.user

// GET /favorites - return a page with favorite songs

router.get('/', async (req, res) => {
    try {
      const favSong = await db.songs.findAll()
      res.render('faves.ejs', {
        user: res.locals.user,
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
  



  

module.exports = router;
