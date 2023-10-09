import User from "../models/user.js";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, isVerified, verifyToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verifyToken });
};

const findUserByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const updateSubscription = async (userId, body) => {};

const updateAvatar = async (userId, avatar) => {};

export default {
  User,
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateTokenVerify,
  findUserByVerifyToken,
};
