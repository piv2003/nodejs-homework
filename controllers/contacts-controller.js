import { Contact, schemas } from "../models/contacts.js";
import bodyWrapper from "../decorators/bodyWrapper.js";
import HttpError from "../helpers/HTTPError.js";

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
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
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }
  res.json(result);
};

export default {
  getAll: bodyWrapper(getAll),
  getById: bodyWrapper(getById),
  add: bodyWrapper(add),
  updateById: bodyWrapper(updateById),
  deleteById: bodyWrapper(deleteById),
};
