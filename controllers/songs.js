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
      // URL doesnt work
      console.log(req.params.name)
      const url = `https://itunes.apple.com/us/rss/topsongs/limit=100/json/${req.params.name}`
      //console.log(url)
      const response = await axios.get(url)
       res.render('show.ejs', {
      details: response.data.entry,
      name: req.params.name
       })
    } catch (error) {
      console.log(error)
      res.status(500).send('Server is down')
    }
  })

// POST /:name
// comments code
router.post('/:name', async (req, res) => {
  try {
    // need to link comment with song
    // comment on left is in db, right side is expected content
    db.comment.create({
        comment: req.body.comment,
        userId: res.locals.userId,
        songId: res.locals
    })
    // always put redirect at the end of TRY
    res.redirect(`/songs/${req.params.name}`)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server is down')
  }
})

// export the router
module.exports = router
