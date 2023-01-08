const express = require('express');
const router = express.Router();
const db = require('../models')
// fetches api 
const axios = require('axios')

// for GET -- add,  user: res.locals.user

// GET /favorites - return a page with favorite songs
// code that shows all favorite songs
router.get('/', async (req, res) => {
    try {

      if(res.locals.user) {
        const currentUser = await db.user.findByPk(res.locals.user.id)
      

      const favorites = await currentUser.getSongs()
      res.render('faves.ejs', {
        user: res.locals.user,
        favorites: favorites
      });
    }
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

      if(res.locals.user) {
        let {name} = req.body
        const currentUser = await db.user.findByPk(res.locals.user.id)
        
        const [newFav, created] = await db.song.findOrCreate({
          where: {
            songName: name
          }
        })
        await currentUser.addSong(newFav)

      // console.log(name)
      // console.log(genre)
      // const favSong = await db.song.findOrCreate({
      //   where: {
      //     // body not referencing body, think of body as a data
      //     // need to make model for specific song to add to DB
      //     songName: name,
      //     genre: genre
      //   }
      // })
      // res.redirect('/songs')
      // res.redirect(req.get('referer'))
      res.redirect('/songs')
    }
    res.redirect('/users/new')
    } catch (error) {
      console.log(error)
    }
  });

 
 
  
  // DELETE //:name
  // deleting song from favorites
  router.delete('/', async (req, res) => {
    try {
      if(res.locals.user) {
        const currentUser = await db.user.findByPk(res.locals.user.id)
        const song = await db.song.findByPk(req.body.songId)
        await currentUser.removeSongs(song)
        res.redirect('/')
        // res.send
      } else {
    res.redirect('/users/new')
      }
    } catch (error) {
      console.log(error)
      res.status(500).send('Server is down')
    }
    // do i need to do just '/' or '/favorites' to redirect it back to the same page
  })


module.exports = router;
