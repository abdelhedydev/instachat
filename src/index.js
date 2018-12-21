import { ApolloServer } from 'apollo-server-express'
import session from 'express-session'
import express from 'express'
import connectRedis from 'connect-redis'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import './db/connect'
require('dotenv').config({ path: 'variables.env' })

const app = express()

// removing the default headers request
app.disable('x-powered-by')

const RedisStore = connectRedis(session)
const store = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  pass: process.env.REDIS_PASS
})

// Session
app.use(session({
  store,
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAnge: process.env.SESS_LIFETIME,
    sameSite: true,
    secure: process.env.NODE_ENV !== 'dev'
  }
}))

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: false,
  playground: process.env.NODE_ENV === 'dev' ? {
    'request.credentials': 'include'
  } : false,
  context: ({ req, res }) => ({ req, res })
})

server.applyMiddleware({ app }) // app is from an existing express app

app.listen({ port: process.env.APP_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost: ${process.env.APP_PORT}`)
)
