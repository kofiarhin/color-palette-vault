const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/server");

let mongo;

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";
  process.env.JWT_EXPIRES_IN = "7d";
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("Auth routes", () => {
  test("registration success", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  test("registration validation failure", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "",
      email: "bad",
      password: "123",
    });
    expect(res.status).toBe(400);
  });

  test("registration duplicate email fails", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(400);
  });

  test("login success and /me", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
    });
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(loginRes.status).toBe(200);
    const cookie = loginRes.headers["set-cookie"];
    const meRes = await request(app).get("/api/auth/me").set("Cookie", cookie);
    expect(meRes.status).toBe(200);
    expect(meRes.body.user.email).toBe("test@example.com");
  });

  test("login failure with bad password", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpass",
    });
    expect(res.status).toBe(400);
  });

  test("/me requires auth", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  test("logout clears cookie", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@example.com",
      password: "password123",
    });
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    const cookie = loginRes.headers["set-cookie"];
    const logoutRes = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", cookie);
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.headers["set-cookie"][0]).toMatch(/token=;/);
  });
});
