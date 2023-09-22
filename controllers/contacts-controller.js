import Contact from "../models/contact.js";
import { HttpCode } from "../constants/user-constants.js";
import bodyWrapper from "../decorators/bodyWrapper.js";
import HttpError from "../helpers/HTTPError.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner", "name email");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(HttpCode.NOT_FOUND, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(HttpCode.NOT_FOUND, `Contact with id=${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

const add = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw new Error(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw new Error(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw new Error(400, "Missing field favorite");
  }
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `id=${id} not found`);
  }
};

export default {
  getAll: bodyWrapper(getAll),
  getById: bodyWrapper(getById),
  add: bodyWrapper(add),
  updateById: bodyWrapper(updateById),
  deleteById: bodyWrapper(deleteById),
  updateFavorite: bodyWrapper(updateFavorite),
};
