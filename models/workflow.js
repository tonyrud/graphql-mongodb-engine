const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkflowSchema = new Schema({
  title: { type: String },
  description: { type: String },
  meta: {
    transformations: String,
    exposures: String,
  },
  type: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },
  initial: String,
  entries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'action',
    },
  ],
  steps: [
    {
      type: Schema.Types.ObjectId,
      ref: 'workflow',
    },
  ],
})

// RecipeSchema.statics.findIngredients = function(id) {
//   return this.findById(id)
//     .populate('ingredients')
//     .then(recipe => recipe.ingredients)
// }

module.exports = mongoose.model('workflow', WorkflowSchema)
