const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MappingSchema = new Schema({
  output: String,
})

module.exports = mongoose.model('mapping', MappingSchema)
