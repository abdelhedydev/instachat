import Joi from 'joi'

export default Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().label('Username'),
  name: Joi.string().min(3).label('Name'),
  password: Joi.string().required().label('Password')
})
