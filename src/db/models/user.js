import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: [6, 'Email should be at leat 6 crc'],
    unique: true
  },
  username: String,
  name: String,
  avatarUrl: String,
  password: String
},
{
  timestamps: true
})
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
    next()
  }
  next()
})
userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}
export default mongoose.model('User', userSchema)
