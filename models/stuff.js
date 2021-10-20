const mongoose = require('mongoose')

const stuffSchema = new mongoose.Schema({
  name: {type: String, required: true},
  img: String,
  description: String,
  value: {type: Number, min:0}
})

const Stuff = mongoose.model('Stuff', stuffSchema)

module.exports = Stuff
