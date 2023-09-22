import User from "../models/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import HttpError from "../helpers/HTTPError.js";
import { HttpCode } from "../constants/user-constants.js";
import bodyWrapper from "../decorators/bodyWrapper.js";

const { JWT_SECRET_KEY } = process.env;

export const checkJwt = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization?.split(" ");
};

export default bodyWrapper(checkJwt);
