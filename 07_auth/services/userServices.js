const { Types } = require('mongoose');

const User = require('../models/userModel');
const { HttpError } = require('../utils');
const { userRolesEnum } = require('../constants');
const { signToken } = require('./jwtServices');

/**
 * Create user service
 * @param {Object} userData
 * @returns {Promise<User>}
 * @category services
 * @author Sergii
 */
exports.createUser = async (userData) => {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  return newUser;
};

// exports.getAllUsers = () => User.find().select('+password').lean();
exports.getAllUsers = () => User.find().lean();

exports.getOneUser = (id) => User.findById(id);

exports.updateUser = async (id, userData) => {
  const user = await User.findById(id).lean();

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

exports.deleteUser = (id) => User.findByIdAndDelete(id);

exports.checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw new HttpError(409, 'User exists');
};

exports.checkUserExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new HttpError(404, 'User not found..');

  const userExists = await User.exists({ _id: id });
  // const userExists = await User.findById(id);

  if (!userExists) throw new HttpError(404, 'User not found..');
};

exports.signup = async (data) => {
  // const newUserData = {
  //   ...data,
  //   role: userRolesEnum.USER,
  // };

  // const newUser = await User.create(newUserData);

  // newUser.password = undefined;

  // const token = signToken(newUser.id);

  // return { user: newUser, token };
  const newUserData = {
    ...data,
    role: userRolesEnum.USER
  };

  const newUser = await User.create(newUserData);
  newUser.password = undefined;
  const token = signToken(newUser.id);
  return token;
};

// exports.login = async ({ email, password }) => {
//   const user = await User.findOne({ email }).select('+password');

//   if (!user) throw new HttpError(401, 'Not authorized..');

//   const passwdIsValid = await user.checkPassword(password, user.password);

//   if (!passwdIsValid) throw new HttpError(401, 'Not authorized..');

//   user.password = undefined;

//   const token = signToken(user.id);

//   return { user, token };
// };

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new HttpError(401, 'Not authorized...');

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, 'Not authorized...');

  user.password = undefined;

  const token = signToken(user.id);
  return { user, token };
};
