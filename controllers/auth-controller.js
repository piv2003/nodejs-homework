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

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${user.verificationToken}" target="_blank">Click verify email</a>`,
    date: { email: user.email },
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Login is not allowed because of Email is not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "23h" });

  await User.updateToken(id, { token });

  res.json({
    status: "success",
    code: HttpCode.OK,
    date: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        id: user.id,
        gender: user.gender,
      },
    },
  });
};

const currentController = async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);
  if (user) {
    return res.json({
      status: "success",
      code: HttpCode.OK,
      message: "Current user data",
      data: { user },
    });
  }

  throw new HttpError(404, "Not Found");
};
