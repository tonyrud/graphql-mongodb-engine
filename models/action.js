const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActionSchema = new Schema({
  task: { type: String },
  mappings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'mapping',
    },
  ],
})

module.exports = mongoose.model('action', ActionSchema)
