import express from "express";
import validateBody from "../../decorators/validateBody.js";
import userSchemas from "../../schemas/user-schemas.js";

const authRouter = express.Router();

export default authRouter;
