import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import express from 'express'
require('dotenv').config({ path: 'variables.env' })

const app = express()

// removing the default headers request
app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV === 'dev'
})

server.applyMiddleware({ app }) // app is from an existing express app

app.listen({ port: process.env.APP_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost: ${process.env.APP_PORT}`)
)
