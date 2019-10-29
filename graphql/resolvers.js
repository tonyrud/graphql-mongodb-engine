const mongoose = require('mongoose')
require('./../models/')
const Workflow = mongoose.model('workflow')

const populates = wf =>
  wf
    .populate({
      path: 'steps',
      populate: { path: 'steps' },
    })
    .populate('initial')
    .populate({
      path: 'entries',
      populate: { path: 'mappings' },
    })

const resolvers = {
  Query: {
    workflows: async () => {
      const wf = Workflow.find({})

      return populates(wf)
    },
    workflow: async (parent, { id }) => {
      const wf = Workflow.findById(id)
      return populates(wf)
    },
  },
}

module.exports = resolvers
