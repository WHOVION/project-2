// create an instance of express router
const express = require('express')
const db = require('../models')
const router = express.Router()

// mount our routes on the router

// GET /users/new -- serves a form to create a new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

//POST /users -- creates a new user from the form @ /users/new
router.post('/', async (req, res) => {
    try {
        // based on the info in the req.body, find or create user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            // TODO: dont add plaintext passwords to the db
            defaults: {
                password: req.body.password
            } 
        })
        // TODO: redirect to the login page if the user is found
        // log the user in(store the users id as a cookie in the browser)
        res.cookie('userId', newUser.id)
        // redirect to the home page(for now)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// GET /users/login -- create a login from that POSTs to /users/login
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
    })
})

// POST /users/login - ingest data from form rendered @ GET /users/login
router.post('/login', async (req, res) => {
    try {
        // look up the user based on their email
        const user = await db.user.findOne({
            where: {
                email: req.body.name
            }
        })
        // boiler plate message if login fails
        const badCredentMessage = 'username or password incorrect'
        if(!user) {
            // if user isnt found in db
            res.redirect('/users/login?message=' + badCredentMessage)
        } else if (user.password !== req.body.password) {
            // if the users supplied password is incorrect
            res.redirect('/users/login?message=' + badCredentMessage)
        } else {
            // if the user is found and their password matches log them in
            console.log('loggin user in')
            res.cookie('userId', user.id)
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// GET /users/logout -- clear any cookies and redirect to the homepage
router.get('/logout', (req, res) => {
    res.send('log the user out by clearing the cookie')
})

// export the router
module.exports = router