const { Schema, model } = require('mongoose')
const { ValidInfoContact } = require('../config/constants')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: ValidInfoContact.MIN_LENGTH_NAME,
      maxLength: ValidInfoContact.MAX_LENGTH_NAME,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
    {
      versionKey: false,
      timestamps: true,
      toJSON: { virtuals: true, transform: function(doc, ret) {
        delete ret._id
        return ret
      } },
      toObject: { virtuals: true },
    }
);

const Contact = model('Contact', contactSchema)

module.exports = {
  Contact,
};
