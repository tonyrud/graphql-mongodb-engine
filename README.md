# graphql-mongodb-engine

## Start stuff


`docker-compose up --build`

## Seed stuff


`npm run db:seed`


## Look at stuff

[localhost:3004](http://localhost:3004/graphql)

Example query

```
  workflow(
    id: "58c039018060197ca0b52d4c",
    parseFor: ENGINE
  ) {
    ... on WorkflowUI {
      title
      steps {
        transformations
      }
    }
    
    ... on WorkflowEngine {
      id
      initial
      states {
        id
        entries {
          id
          mappings {
            id
            output
          }
        }
        type
        states {
          id
        }
      }
    }
  }
}
```