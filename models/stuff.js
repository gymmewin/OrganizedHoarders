const mongoose = require('mongoose')

const stuffSchema = new mongoose.Schema({
  title: {type: String, required: true, maxLength: 40},
  img: String,
  description: String,
  value: {type: Number, min:0}
})

const Stuff = mongoose.model('Stuff', stuffSchema)

module.exports = Stuff
