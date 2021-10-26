//========================= Dependencies =========================//
const express = require('express')
const router = express.Router()

//========================= Models =========================//
const stuffSeed = require('../models/seed.js')
const seedFunko = require('../models/seedFunko.js')
const seedMMPR = require('../models/seedMMPR.js')
const Stuff = require('../models/stuff.js')


//========================= Middleware =========================//
const isAuthenticated = (req,res,next) => {
  if (req.session.currentUser){
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

//========================= Routes =========================//

//========================= New Route =========================//
router.get('/new', isAuthenticated, (req, res) => {
  res.render(
    'new.ejs',
    {currentUser: req.session.currentUser}
  )
})

//========================= Seed Route =========================//
router.get('/seed', (req, res) => {
  //run this for of loop and set the stuff to belong to stuff.user and make stuff.user = to currentUser
  for(const stuff of stuffSeed){
    stuff.user = req.session.currentUser._id
  }
  Stuff.create(stuffSeed, (error, data) => {
    res.redirect('/stuff')
  })
})

router.get('/seed/funko', (req, res) => {
  for(const stuff of seedFunko){
    stuff.user = req.session.currentUser._id
  }
  Stuff.create(seedFunko, (error, data) => {
    res.redirect('/stuff')
  })
})

router.get('/seed/mmpr', (req, res) => {
  for(const stuff of seedMMPR){
    stuff.user = req.session.currentUser._id
  }
  Stuff.create(seedMMPR, (error, data) => {
    res.redirect('/stuff')
  })
})

//========================= Index Route =========================//
router.get('/', (req, res) => {
  //Don't find all the objects with empty {}. Find all the objects that belong to the user.
  Stuff.find({user: req.session.currentUser}, (error, allStuff) => {
    let sum = 0
    for(let amount of allStuff){
      sum += amount.value
    }
    res.render (
      'index.ejs',
      {
        stuff: allStuff,
        sum: sum,
        currentUser: req.session.currentUser
      }
    )
  })
})

//========================= Delete Route =========================//
router.delete('/:id', (req,res) => {
  Stuff.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/stuff')
  });
})

//========================= Show Route =========================//
router.get('/:id', (req,res) => {
  Stuff.findById(req.params.id, (error, showStuff) => {
    res.render(
      'show.ejs',
      {
        stuff: showStuff,
        currentUser: req.session.currentUser
      }
    )
  })
})

//========================= Post Route =========================//
router.post('/', (req,res) => {
  //when creating new stuff, assign the user of the stuff as the currentUser.
  req.body.user = req.session.currentUser._id
  Stuff.create(req.body, (error, createdStuff) => {
    res.redirect('/stuff')
  })
})

//========================= Edit Route =========================//
router.get('/:id/edit', (req,res) => {
  Stuff.findById(req.params.id, (error, foundStuff) => {
    res.render(
      'edit.ejs',
      {
        stuff: foundStuff,
        currentUser: req.session.currentUser
      }
    )
  })
})

//========================= Update Route =========================//
router.put('/:id', (req,res) => {
  Stuff.findByIdAndUpdate(req.params.id, req.body, (error, updateModel) => {
    res.redirect('/stuff')
  })
})

module.exports = router
