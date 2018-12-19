import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { User } from '../db/models'
export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId(id)) {
        throw new UserInputError(`${id} is not valid id`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => User.create(args)
  }
}
