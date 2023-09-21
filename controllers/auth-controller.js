import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { HttpCode } from "../constants/user-constants.js";
import bodyWrapper from "../decorators/bodyWrapper.js";
import HttpError from "../helpers/HTTPError.js";

const { JWT_SECRET_KEY } = process.env;

const register = async (req, res, next) => {};

const login = async (req, res, next) => {};

const current = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: HttpCode.OK,
    date: {
      email,
      subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: "" });
  res.status(HttpCode.NO_CONTENT).json({ message: "SignOut success" });
};

export default {
  register: bodyWrapper(register),
  login: bodyWrapper(login),
  logout: bodyWrapper(logout),
  current: bodyWrapper(current),
};
