import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";
import {
  emailDateRegexp,
  nameDateRegexp,
  phoneDateRegexp,
} from "../constants/contacts-constants.js";

import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameDateRegexp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailDateRegexp,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneDateRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamp: true }
);

const Contact = model("contact", contactSchema);

export { Contact, schemas };
