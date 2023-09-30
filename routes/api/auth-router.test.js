import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../../app.js";
import { User } from "../../models/user.js";

const { PORT, DB_HOST_TEST } = process.env;
