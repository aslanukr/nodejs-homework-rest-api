import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.js";
import { signIn } from "../../controllers/users/index.js";

const { DB_HOST_TEST, PORT } = process.env;

/*
1) Given user email and password 
2) Return status 200 + token and user object that includes "email" and "subscription"
*/

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    mongoose.connection.close();
    server.close();
  });

  test(`test login with correct data`, async () => {
    const loginData = {
      email: "test@gmail.com",
      password: "123456789",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
    expect(body.user.email).toBe(loginData.email);
    expect(body.user).toHaveProperty("subscription");

    const user = await User.findOne({ email: loginData.email });
    expect(user.email).toBe(loginData.email);
  });

  test("test login with wrong email", async () => {
    const loginData = {
      email: "test1@gmail.com",
      password: "123456789",
    };
    const { statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(401);
    expect(() => signIn().toThrow("Email or password is wrong"));
  });

  test("test login with wrong password", async () => {
    const loginData = {
      email: "test@gmail.com",
      password: "000000000",
    };
    const { statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(401);
    expect(() => signIn().toThrow("Email or password is wrong"));
  });

  test("test login with missing required fields", async () => {
    const loginData = {
      email: "",
      password: "",
    };
    const { statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(statusCode).toBe(400);
    expect(() => signIn().toThrow("Missing required field"));
  });
});
