const Joi = require('joi');

module.exports = {
    addContactsValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
              .alphanum()
              .min(2)
              .max(150)
              .required(),
            email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: Joi.string()
              .alphanum()
              .min(3)
              .max(20)
              .required(),
          })
        
          const validationResult = schema.validate(req.body);
          if (validationResult.error) {
            return res.status(400).json({ massege: 'Cannot add contact' })
        } 

        next();
    },

    putContactsValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
              .alphanum()
              .min(2)
              .max(150)
              .required(),
            email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: Joi.string()
              .alphanum()
              .min(3)
              .max(20)
              .required(),
          })
        
          const validationResult = schema.validate(req.body);
          if (validationResult.error) {
            return res.status(404).json({ massege: 'Contact not found' })
        }

        next();
    }
};