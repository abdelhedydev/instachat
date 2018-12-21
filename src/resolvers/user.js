import Joi from 'joi'
import { User } from '../db/models'
import { signUp } from '../validation'
import * as Auth from '../utils/auth'
export default {
  Query: {
    me: (root, args, { req }, info) => {
      Auth.checksignIn(req)
      return User.findById(req.session.userID)
    },
    users: (root, args, { req }, info) => {
      Auth.checksignIn(req)
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      Auth.checksignIn()
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      Auth.checksignOut(req)
      await Joi.validate(args, signUp, { abortEarly: false })
      const user = await User.create(args)
      req.session.userID = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      Auth.checksignOut(req)
      const { userID } = req.session
      if (userID) {
        return User.findById(req.session.userID)
      }
      const { email, password } = args
      const user = await Auth.attemptSignIn(email, password)
      req.session.userID = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      // Auth.checksignOut(req)
      return Auth.signOut(req, res)
    }
  }
}
