const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// for GET -- add,  user: res.locals.user

// GET /favorites - return a page with favorite songs
// code that shows all favorite songs
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


  // GET /songName
  // this is the code to see more details of a song
  router.get('/:name', async (req, res) => {
    try {
    
    } catch (error) {
      console.log(error)
      res.status(500).send('Server is down')
    }
    res.render('details.ejs')
  })

  
  // POST /favorites - receive the name of the song and add it to database
  // POST is add
  // PUT is update
  router.post('/', async (req, res) => {
    try {
      const songs = await db.songs.findOrCreate({
        where: {
          // body not referencing body, think of body as a data
          // need to make model for specific song to add to DB
          name: req.body.name
        }
      })
    } catch (error) {
      console.log(error)
    }
    // TODO: Get form data and add a new record to DB
    // figure out reason of params
    res.redirect('/songs');
  });
  
  
  // DELETE //:name
  // deleting song from favorites
  router.delete('/:name', async (req, res) => {
    try {
    
    } catch (error) {
      console.log(error)
      res.status(500).send('Server is down')
    }
    // do i need to do just '/' or '/favorites' to redirect it back to the same page
    res.redirect('/favorites')
  })


module.exports = router;