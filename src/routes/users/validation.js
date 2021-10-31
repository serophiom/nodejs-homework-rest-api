const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { HttpCode, Subscription } = require('../../../config/constants');

const schemaUserRegistration = Joi.object({
  name: Joi.string()
    .min(ValidInfoContact.MIN_LENGTH_NAME)
    .max(ValidInfoContact.MAX_LENGTH_NAME)
    .optional(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .optional(),
});

const schemaUserLogIn = Joi.object({
  email: Joi.string()
  .email()
  .required(),
  password: Joi.string()
  .min(8)
  .required(),
});

const schemaSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .required(),
});

const schemaRepeatEmailForVerifyUser = Joi.object({
  email: Joi.string()
  .email()
  .required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Validation error: ${error.message}`,
    });
  }
};

module.exports.validateUserRegistration = async (req, res, next) => {
  return await validate(schemaUserRegistration, req.body, res, next);
};

module.exports.validateUserLogIn = async (req, res, next) => {
  return await validate(schemaUserLogIn, req.body, res, next);
};

module.exports.validateSubscriptionUser = async (req, res, next) => {
  return await validate(schemaSubscriptionUser, req.body, res, next);
};

module.exports.validateRepeatEmailForVerifyUser = async (req, res, next) => {
  return await validate(schemaRepeatEmailForVerifyUser, req.body, res, next);
};