const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')
// fetches api 

// for GET -- add,  user: res.locals.user

// GET /favorites - return a page with favorite songs
// code that shows all favorite songs
router.get('/', async (req, res) => {
    try {
      const favorites = await db.songs.findAll()
      res.render('faves.ejs', {
        user: res.locals.user,
        favorites: favorites
      });
    } catch (error) {
      console.log(error)
    }
  });


  // POST /favorites - receive the name of the song and add it to database
  // POST is add
  // PUT is update
  // during sequelize, dont mess with join table
  router.post('/', async (req, res) => {
    try {
      let {name, artist, genre, price, image} = req.body
      // console.log(name)
      // console.log(genre)
      const favSong = await db.song.findOrCreate({
        where: {
          // body not referencing body, think of body as a data
          // need to make model for specific song to add to DB
          songName: name,
          artist: artist,
          genre: genre,
          price: price,
          image: image
        }
      })
      // res.redirect('/songs')
      res.redirect(req.get('referer'))
    } catch (error) {
      console.log(error)
    }
  });
  

  // GET /songName
  // this is the code to see more details of a song
  router.get('/:name', async (req, res) => {
    try {
      // const url = `https://itunes.apple.com/us/rss/topsongs/limit=100/json${req.params.name}`
      // const response = await axios.get(url)
      // let songName = req.body.song['im:name'].label
       res.render('details.ejs', {
      // details: response.data,
      // name: req.params.songName
      let {name, artist, genre, price, image} = req.body
      const details = await db.song.findOrCreate({
        where: {
          songName: name,
          artist: artist,
          genre: genre,
          price: price,
          image: image
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Server is down')
    }
  })

 
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