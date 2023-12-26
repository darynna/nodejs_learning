const { model, Schema } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');

const { userRolesEnum } = require('../constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Duplicated email..'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre save hook. Fires on "save" and "create" !!!!!
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  next();
});

// userSchema.pre(/^find/, () => {
//   console.log('FIND');
// });

userSchema.methods.checkPassword = (candidate, passwdHash) => compare(candidate, passwdHash);

const User = model('User', userSchema);

module.exports = User;
