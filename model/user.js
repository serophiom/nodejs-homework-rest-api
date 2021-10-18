const { Schema, model } = require('mongoose');
const { Subscription } = require('../config/constants');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;

const usertSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
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
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: {
            values: [Subscription.STARTER, Gender.PRO, Gender.BUSINESS],
        },
        default: Subscription.STARTER,
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

usertSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next()
});

usertSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = model('user', contactSchema)

module.exports = {
  User,
};