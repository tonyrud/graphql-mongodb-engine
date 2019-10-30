const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar JSON

  enum DataShape {
    ENGINE
  }

  union WorkflowType = WorkflowEngine | WorkflowUI

  type Mapping {
    id: ID!
    output: JSON
  }

  type Action {
    id: ID!
    task: String
    mappings: [Mapping]
  }

  type WorkflowStep {
    id: ID!
    title: String
    transformations: JSON
  }

  type WorkflowUI {
    id: ID!
    description: String
    steps: [WorkflowStep]
    title: String!
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
    workflow(id: ID!, parseFor: DataShape): WorkflowType
  }
`

module.exports = typeDefs
