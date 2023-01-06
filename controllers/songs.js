const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios'); 


// GET /songs
router.get('/', (req, res) => {
  let apiURL = 'https://itunes.apple.com/us/rss/topsongs/limit=100/json';
  // Use request to call the API
  axios.get(apiURL).then(apiResponse => {
    let songs = apiResponse.data.feed.entry;
    // console.log(apiResponse.data.feed.entry)
    res.render('songs.ejs', { songs: songs, 
      user: res.locals.user });
  })
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

// POST /:name
// comments code
router.post('/:name', async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).send('Server is down')
  }
  res.redirect('/songs/:name')
})

// export the router
module.exports = router