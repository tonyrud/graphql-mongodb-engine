const { Schema, model } = require('mongoose')

const ActionSchema = new Schema({
  task: String,
  mappings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'mapping',
    },
  ],
})

module.exports = model('action', ActionSchema)
