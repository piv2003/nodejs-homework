import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";
import { HttpCode } from "../constants/user-constants.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(HttpCode.NOT_FOUND, `${id} is not valid id`));
  }
  next();
};

export default isValidId;
