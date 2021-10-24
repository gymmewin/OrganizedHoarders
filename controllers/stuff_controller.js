//========================= Dependencies =========================//
const express = require('express')
const router = express.Router()

//========================= Models =========================//
const stuffSeed = require('../models/seed.js')
const seedFunko = require('../models/seedFunko.js')
const seedMMPR = require('../models/seedMMPR.js')
const Stuff = require('../models/stuff.js')


//========================= Routes =========================//

//========================= New Route =========================//
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

//========================= Seed Route =========================//
router.get('/seed', (req, res) => {
  Stuff.create(stuffSeed, (error, data) => {
    res.redirect('/stuff')
  })
})

router.get('/seed/funko', (req, res) => {
  Stuff.create(seedFunko, (error, data) => {
    res.redirect('/stuff')
  })
})

router.get('/seed/mmpr', (req, res) => {
  Stuff.create(seedMMPR, (error, data) => {
    res.redirect('/stuff')
  })
})

//========================= Index Route =========================//
router.get('/', (req, res) => {
  Stuff.find({}, (error, allStuff) => {
    let sum = 0
    for(let amount of allStuff){
      sum += amount.value
    }
    res.render (
      'index.ejs',
      {
        stuff: allStuff,
        sum: sum
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
        // currentUser: req.session.currentUser
      }
    )
  })
})

//========================= Post Route =========================//
router.post('/', (req,res) => {
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
        // currentUser: req.session.currentUser
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
