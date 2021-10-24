const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req,res) => {
  res.render(
    'sessions/new.ejs',
    {currentUser: req.session.currentUser}
  )
})

sessions.post('/', (req,res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if (error){
      console.log(error)
      res.send('Sorry, but the Database ran into a problem')
    } else if (!foundUser) {
      res.send('<a href="/sessions/new">Sorry, this user was not found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/stuff')
      } else {
        res.send('<a href="/sessions/new">Password does not match</a>')
      }
    }
  })
})

sessions.delete('/', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
