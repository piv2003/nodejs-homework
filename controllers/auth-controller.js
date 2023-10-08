import User from "../repository/users.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import fs, { mkdir } from "fs/promises";
import UploadService from "../services/file-upload.js";
import "dotenv/config";
import { HttpCode } from "../constants/user-constants.js";
import bodyWrapper from "../decorators/bodyWrapper.js";
import { HttpError, sendEmail } from "../helpers/index.js";

const { JWT_SECRET_KEY, BASE_URL } = process.env;

const registrationController = async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const user = await User.findByEmail(email);
  const { error } = User.userSchema.validate(req.body);
  if (error) {
    throw HttpError(
      HttpCode.BAD_REQUEST,
      `Error from Joi or other validation library`
    );
  }
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
    });
  }
  try {
    const { verificationToken } = req.params;
    const newUser = await User.create({ name, email, password, gender });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click to verify your email</a>`,
    };

    await sendEmail(verifyEmail);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        avatar: newUser.avatar,
      },
    });
  } catch (e) {
    next(e);
  }
};
const verifyUserEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};
