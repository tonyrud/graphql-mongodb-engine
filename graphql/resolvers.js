require('./../models/')
const mongoose = require('mongoose')
const GraphQLJSON = require('graphql-type-json')
const Workflow = mongoose.model('workflow')

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
      const { transformations } = meta

      if (transformations) {
        return JSON.parse(transformations)
      }
      return []
    },
    title: ({ meta: { title } }) => title,
  },
  Query: {
    workflows: () => {
      Workflow.find({})
    },
    workflow: (_, { id, parseFor }) => {
      return getWorkflowFor(id, parseFor)
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

async function getWorkflowFor(id, parseFor) {
  const wf = await Workflow.findById(id)
  if (parseFor === 'ENGINE') {
    return wf
  } else {
    const {
      _id,
      states,
      meta: { transformations, title, description },
    } = wf

    // spread operator will not work here, for some reason :shrug
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
