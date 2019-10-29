const { gql } = require('apollo-server')

const typeDefs = gql`
  # enum WorkfowType {
  #     ENGINE
  # }

  type Mapping {
    output: String
  }

  type Action {
    task: String
    mappings: [Mapping]
  }

  type Workflow {
    id: ID!
    description: String
    initial: Workflow
    entries: [Action]
    steps: [Workflow]
    title: String
    type: String
  }

  type Query {
    workflows: [Workflow]!
    workflow(id: ID!): Workflow!
  }
`

module.exports = typeDefs
