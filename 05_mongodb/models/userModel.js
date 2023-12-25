// const { model, Schema } = require('mongoose');

// const { userRolesEnum } = require('../constants');

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: [true, 'Duplicated email..'],
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },
//     year: Number,
//     role: {
//       type: String,
//       enum: Object.values(userRolesEnum),
//       default: userRolesEnum.USER,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// const User = model('User', userSchema);

// module.exports = User;
const { model, Schema } = require('mongoose');
const { userRolesEnum } = require('../constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Dubplicate emain...']
    },
    password: {
      type: String,
      required: true,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.USER
    }
  }
);

const User = model('User', userSchema);
module.exports = User;
