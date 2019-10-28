const { gql } = require('apollo-server');

const typeDefs = gql`

    # enum WorkfowType {
    #     ENGINE
    # }

    type Workflow {
        id: ID!
        gender: String
        birthDate: String
    }

    type Query {

        workflow(id: String): Workflow!

    }

`;

module.exports = typeDefs;
