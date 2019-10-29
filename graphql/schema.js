const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar JSON

  enum DataShape {
    ENGINE
  }

  union WorkflowType = WorkflowEngine | WorkflowUI

  type Mapping {
    output: String
  }

  type Action {
    task: String
    mappings: [Mapping]
  }

  type WorkflowUI {
    id: ID!
    description: String
    steps: [WorkflowUI]
    title: String
    transformations: String
  }

  type WorkflowEngine {
    id: ID!
    initial: String
    entries: [Action]
    states: [WorkflowEngine]
    type: String
  }

  type Query {
    workflows: [WorkflowUI]
    workflow(id: ID!, dataFor: DataShape): WorkflowType
  }
`

module.exports = typeDefs
