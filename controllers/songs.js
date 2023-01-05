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

// GET /songs/songName
// since this is a bracket notation, how to i make name as param
router.get('/:name', async (req, res) => {
  try {
    const url = `https://itunes.apple.com/us/rss/topsongs/limit=100/json${req.params.name}`
    const response = await axios.get(url)
    res.render('details.ejs', {
      songs: response.data.feed.entry,
      name: req.params.name
    })
    // console.log(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).send('api error')
  }
})







// export the router
module.exports = router