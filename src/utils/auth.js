import { AuthenticationError } from 'apollo-server-express'
import { User } from '../db/models'

export const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError('email is not Correct !')
  }
  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError('Password is not Correct !')
  }
  return user
}
export const checksignIn = (req) => {
  if (!req.session.userID) {
    throw new AuthenticationError('must authenticate Oh !')
  }
}
export const checksignOut = (req) => {
  if (req.session.userID) {
    throw new AuthenticationError('Already Sign In !')
  }
}
export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)
      res.clearCookie(process.env.SESS_NAME)
      resolve(true)
    })
  }
)
