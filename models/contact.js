import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import {
  emailDateRegexp,
  nameDateRegexp,
  phoneDateRegexp,
} from "../constants/contacts-constants.js";

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamp: true }
);

contactSchema.pre("findOneAndUpdate", runValidateAtUpdate);
contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);

const updateFavoriteSchema = new Schema({
  favorite: {
    type: Boolean,
    required: true,
  },
});

const Contact = model("contact", {
  contactSchema,
  updateFavoriteSchema,
});

export default Contact;
