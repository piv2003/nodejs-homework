import User from "../models/user.js";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (options) => {};

const updateToken = async (id, token) => {};

const updateTokenVerify = async (id) => {};

const findUserByVerifyToken = async (verifyToken) => {};

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
