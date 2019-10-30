const mongoose = require('mongoose')
require('./../models/')
const GraphQLJSON = require('graphql-type-json')
const Workflow = mongoose.model('workflow')

const populates = wf =>
  wf
    .populate({
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

const resolvers = {
  JSON: GraphQLJSON,
  Mapping: {
    output: ({ output }) => {
      if (output) {
        return JSON.parse(output)
      }
      return ''
    },
  },
  WorkflowStep: {
    transformations: ({ meta }) => {
      if (meta && meta.transformations) {
        return JSON.parse(meta.transformations)
      }
      return []
    },
  },
  Query: {
    workflows: () => {
      Workflow.find({})
    },
    workflow: (_, { id, parseFor }) => {
      return getWorkflowEngine(id, parseFor)
    },
  },
  WorkflowType: {
    __resolveType(obj) {
      if (obj.states) {
        return 'WorkflowEngine'
      }
      if (obj.steps) {
        return 'WorkflowUI'
      }
    },
  },
}

async function getWorkflowEngine(id, parseFor) {
  const wf = await Workflow.findById(id)
  if (parseFor === 'ENGINE') {
    return wf
  } else {
    const {
      _id,
      title,
      description,
      states,
      meta: { transformations },
    } = wf

    return {
      id: _id,
      title,
      description,
      steps: states,
      transformations,
    }
  }
}

module.exports = resolvers
