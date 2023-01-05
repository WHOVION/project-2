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
router.get('/', async (req, res) => {
  try {
    const url = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`
    const response = await axios.get(url)
    res.render('show.ejs', {
      pokemons: response.data,
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