const { Schema, model } = require('mongoose')
const { Gender } = require('../config/constants')

const usertSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
    //   minLength: ValidInfoContact.MIN_LENGTH_NAME,
    //   maxLength: ValidInfoContact.MAX_LENGTH_NAME,
    //   required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+.\S+/
        return re.test(String(value).toLocaleLowerCase())
      },
    },
    passwors: {
        type: String,
        required: [true, 'Set password for user'],
    },
    gender: {
        type: String,
        enum: {
            values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
            massage: 'Gender not allowed',
        },
        default: Gender.NONE,
    },
    token: {
        type: String,
        default: null,
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

const User = model('user', contactSchema)

module.exports = {
  User,
};