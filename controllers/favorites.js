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
      const favSong = await db.users_songs.findAll()
      res.render('faves.ejs', {
        user: res.locals.user,
        favSong: favSong
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
      const favSong = await db.users_songs.findOrCreate({
        where: {
          // body not referencing body, think of body as a data
          // need to make model for specific song to add to DB
          name: req.body.song['im:name'].label
        }
      })
    } catch (error) {
      console.log(error)
    }
    // TODO: Get form data and add a new record to DB
    // figure out reason of params
    res.redirect('/songs');
  });
  

  // GET /songName
  // this is the code to see more details of a song
  router.get('/:name', async (req, res) => {
    try {
      const url = `https://itunes.apple.com/us/rss/topsongs/limit=100/json${req.params.name}`
      const response = await axios.get(url)
       res.render('show.ejs', {
      details: response.data,
      name: req.params.name
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

  // First, get a reference to a pet.
// db.pet.findOrCreate({
//   where: {
//     name: "Silly May",
//     species: "Mini Aussie",
//     userId: 1
//   }
// }).then(([pet, created]) => {
//   // Second, get a reference to a toy.
//   db.toy.findOrCreate({
//     where: {type: "stinky bear", color: "brown"}
//   }).then(([toy, created]) => {
//     // Finally, use the "addModel" method to attach one model to another model.
//     pet.addToy(toy).then(relationInfo => {
//       console.log(`${toy.type} added to ${pet.name}.`);
//     });
//   });
// });

module.exports = router;