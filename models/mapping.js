const { Schema, model } = require('mongoose')

const MappingSchema = new Schema({
  output: String,
})

module.exports = model('mapping', MappingSchema)
