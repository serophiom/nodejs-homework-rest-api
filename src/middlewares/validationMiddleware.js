const Joi = require('joi')

const schemaContact = Joi.object({
  name: Joi.string()
    .min(2)
    .max(150)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .required(),
})

const schemaChangeContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string()
    .email()
    .optional(),
  phone: Joi.string()
    .optional(),
})

const schemaId = Joi.object({
  contactId: Joi.string()
    .required(),
})

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validation error',
    })
  }
}

module.exports.contactValidation = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.contactChangeValidation = async (req, res, next) => {
  return await validate(schemaChangeContact, req.body, res, next)
}

module.exports.idValidation = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next)
}
