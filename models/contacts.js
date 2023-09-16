import express from "express";
import contactSchema from "../../schemas/contacts-schemas.js";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import isValidId from "../../middlewares/isValidId.js";

const contactAddValidate = validateBody(contactSchema.contactAddSchema);
const contactUpdateFavorite = validateBody(contactSchema.contactUpdateFavorite);
const contactsRouter = express.Router();

export default contactsRouter;
