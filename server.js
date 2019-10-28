const koa = require('koa')

const { ApolloServer } = require('apollo-server-koa')
const playground = require('./graphql/playground')
const startMongo = require('./data/connection')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const cors = { credentials: true }

const app = new koa()
const PORT = 3004

startMongo()

const server = new ApolloServer({
  context: ({ ctx }) => ctx,
  tracing: true,
  introspection: true,
  playground,
  resolvers,
  typeDefs,
  subscriptions: true,
})

server.applyMiddleware({
  app,
  cors,
})

const httpServer = app.listen(PORT, () =>
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)

server.installSubscriptionHandlers(httpServer)
