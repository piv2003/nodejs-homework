import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const { DB_HOST, PORT = 3001 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `console.log("Database connection successful on port: ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
