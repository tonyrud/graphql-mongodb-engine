const { Schema, model } = require('mongoose')

const WorkflowSchema = new Schema({
  meta: {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: String,
    transformations: String,
    exposures: String,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  type: String,
  initial: String,
  entries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'action',
    },
  ],
  states: [
    {
      type: Schema.Types.ObjectId,
      ref: 'workflow',
    },
  ],
})

const populate = function(next) {
  this.populate({
    path: 'states',
    populate: { path: 'states' },
  })
    .populate({
      path: 'states',
      populate: { path: 'entries' },
    })
    .populate({
      path: 'entries',
      populate: { path: 'mappings' },
    })
  next()
}

WorkflowSchema.pre('findOne', populate).pre('find', populate)

// RecipeSchema.statics.findIngredients = function(id) {
//   return this.findById(id)
//     .populate('ingredients')
//     .then(recipe => recipe.ingredients)
// }

module.exports = model('workflow', WorkflowSchema)
