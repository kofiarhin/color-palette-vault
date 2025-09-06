const app = require("../src/app");
const request = require("supertest");

describe("testing server", () => {
  it("should just pass", async () => {
    const { statusCode, body } = await request(app).get("/");
    expect(statusCode).toBe(200);
  });

  it("should return list of color palettes", async () => {
    const { statusCode, body } = await request(app).get("/api/palettes");
    console.log({ statusCode, body });
  });
});
