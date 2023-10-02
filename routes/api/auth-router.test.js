import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../../app.js";
import { User } from "../../models/user.js";

const { PORT, DB_HOST_TEST } = process.env;
describe("test register", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test register with correct data", async () => {
    const requestData = {
      name: "Bogdan",
      email: "bogdan@gmail.com",
      password: "1234567",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/register")
      .send(requestData);

    expect(statusCode).toBe(201);
    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
    expect(body.user.email).toBe(requestData.email);
    expect(body.user.subscription).toBe("starter");

    const user = await User.findOne({ email: requestData.email });
    expect(user?.name).toBe(requestData.name);
  });

  test("test register with correct data and subscription:'pro'} ", async () => {
    const requestData = {
      name: "Bogdan",
      email: "bogdan@gmail.com",
      password: "7894561",
      subscription: "pro",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/register")
      .send(requestData);
    expect(statusCode).toBe(201);
    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
    expect(body.user.email).toBe(requestData.email);
    expect(body.user.subscription).toBe(requestData.subscription);

    const user = await User.findOne({ email: requestData.email });
    expect(user?.name).toBe(requestData.name);
    expect(user?.subscription).toBe(requestData.subscription);
  });

  test("test register with bad email format", async () => {
    const requestData = {
      email: "bogdan@gmail",
      password: "1234567",
    };
    const { statusCode, body, error } = await request(app)
      .post("/api/auth/register")
      .send(requestData);

    expect(statusCode).toBe(400);
    expect(body.token).toBeUndefined();
    expect(body.user).toBeUndefined();
    expect(error.message).toBe(`Error from Joi or other validation library`);

    const userCount = await User.countDocuments();
    expect(userCount).toBe(0);
  });

  test("test register missing email input", async () => {
    const requestData = {
      password: "1234567",
    };
    const { statusCode, body, error } = await request(app)
      .post("/api/auth/register")
      .send(requestData);

    expect(statusCode).toBe(400);
    expect(body.token).toBeUndefined();
    expect(body.user).toBeUndefined();
    expect(error.message).toBe(`Error from Joi or other validation library`);

    const userCount = await User.countDocuments();
    expect(userCount).toBe(0);
  });

  test("test register missing password input", async () => {
    const requestData = {
      email: "bogdan@gmail.com",
    };
    const { statusCode, body, error } = await request(app)
      .post("/api/auth/register")
      .send(requestData);

    expect(statusCode).toBe(400);
    expect(body.token).toBeUndefined();
    expect(body.user).toBeUndefined();
    expect(error.message).toBe(`Error from Joi or other validation library`);

    const userCount = await User.countDocuments();
    expect(userCount).toBe(0);
  });

  test("test register existing user", async () => {
    const requestData = {
      name: "Bogdan",
      email: "bogdan@gmail.com",
      password: "1234567",
    };
    await request(app).post("/api/auth/register").send(requestData);
    try {
      const { statusCode, body, error } = await request(app)
        .post("/api/auth/register")
        .send(requestData);
      expect(statusCode).toBe(409);
      expect(error.message).toBe(
        `Email ${requestData.email} is already in use`
      );
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe(
        `Email ${requestData.email} is already in use`
      );
    }
  });
});
