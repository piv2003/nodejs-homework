import express from "express";
import validateBody from "../../decorators/validateBody.js";
import userSchemas from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";
import { checkJwt } from "../../middlewares/index.js";

const authRouter = express.Router();

export default authRouter;
