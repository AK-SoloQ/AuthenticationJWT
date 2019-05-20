//VALIDATION
const Joi = require('@hapi/joi')
// Register validation
const registerValidation = (user) => {
      const schema = {
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).email().required(),
            password: Joi.string().min(6).required()
      }
      const { error } = Joi.validate(user, schema)
      if (error) return error.details[0].message
      return null
}

const registerLogin = (user) => {
      const schema = {
            email: Joi.string().min(6).email().required(),
            password: Joi.string().min(6).required()
      }
      const { error } = Joi.validate(user, schema)
      if (error) return error.details[0].message
      return null
}
module.exports = { registerValidation, registerLogin }
