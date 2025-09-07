const app = require("../src/app");
const request = require("supertest");

describe("testing server", () => {
  it("just a passing test", async () => {
    const { statusCode, body } = await request(app).get("/api/palettes");
    console.log({ statusCode, body });
  });
});
