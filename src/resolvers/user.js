import Joi from 'joi'
import { User } from '../db/models'
import { SignUp } from '../validation'
export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({})
    },
    user: (root, { id }, context, info) => User.findById(id)
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      await Joi.validate(args, SignUp, { abortEarly: false })
      return User.create(args)
    }
  }
}
