const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { ValidInfoContact } = require('../../config/constants')

const schemaContact = Joi.object({
  name: Joi.string()
    .min(ValidInfoContact.MIN_LENGTH_NAME)
    .max(ValidInfoContact.MAX_LENGTH_NAME)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .required(),
  favorite: Joi.boolean()
  .optional(),
})

const schemaChangeContact = Joi.object({
  name: Joi.string()
    .min(ValidInfoContact.MIN_LENGTH_NAME)
    .max(ValidInfoContact.MAX_LENGTH_NAME)
    .optional(),
  email: Joi.string()
    .email()
    .optional(),
  phone: Joi.string()
    .optional(),
  favorite: Joi.boolean()
    .optional(),
});

const schemaId = Joi.object({
  contactId: Joi.objectId()
    .required(),
})

const schemaStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Validation error: ${error.message}`,
    });
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

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next);
};

