import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";
import {
  emailDateRegexp,
  nameDateRegexp,
  phoneDateRegexp,
} from "../constants/contacts-constants.js";

import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const Contact = model("contact", contactSchema);

export { Contact, schemas };
