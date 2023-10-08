import User from "../models/user.js";

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

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
