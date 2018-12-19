import mongoose from 'mongoose'
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
export default mongoose.model('User', userSchema)
