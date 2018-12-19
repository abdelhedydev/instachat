import mongoose from 'mongoose'
require('dotenv').config({ path: 'variables.env' })
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch(err => console.log(`error : ${err}`))
