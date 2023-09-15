import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import contactsRouter from "./routes/api/contacts-router.js";

dotenv.config();
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

export default app;
