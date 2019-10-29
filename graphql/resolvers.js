const mongoose = require('mongoose')
require('./../models/')
const GraphQLJSON = require('graphql-type-json')
const Workflow = mongoose.model('workflow')

const populates = wf =>
  wf
    .populate({
      path: 'steps',
      populate: { path: 'steps' },
    })
    .populate({
      path: 'entries',
      populate: { path: 'mappings' },
    })

const resolvers = {
  JSON: GraphQLJSON,
  WorkflowUI: {
    transformations: ({ meta }) => {
      return meta.transformations
    },
  },
  Query: {
    workflows: async () => {
      const wf = Workflow.find({})

      return populates(wf)
    },
    workflow: async (_, { id, dataFor }) => {
      //   console.log('stuff', stuff)
      //   const wf = Workflow.findById(args.id)
      return getWorkflowEngine(id, dataFor)
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

async function getWorkflowEngine(id, dataFor) {
  const wf = Workflow.findById(id)
  const {
    _id,
    initial,
    entries,
    steps,
    type,
    title,
    description,
    meta,
  } = await populates(wf)

  if (dataFor === 'ENGINE') {
    return {
      _id,
      initial,
      entries,
      states: steps,
      type,
    }
  } else {
    return {
      _id,
      title,
      description,
      steps,
      transformations: meta.transformations,
    }
  }
}

module.exports = resolvers
