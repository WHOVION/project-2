const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios'); 



router.get('/', (req, res) => {
  let apiURL = 'https://itunes.apple.com/us/rss/topsongs/limit=100/json';
  // Use request to call the API
  axios.get(apiURL).then(apiResponse => {
    let songs = apiResponse.data.feed.entry;
    console.log(apiResponse.data.feed.entry)
    res.render('songs.ejs', { songs: songs });
  })
});

router.



// export the router
module.exports = router