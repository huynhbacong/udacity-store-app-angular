import supertest from "supertest";
import app from "../../server";
import { createJwtToken } from "../../utilities/helpers";
import { User } from "../../models/users";

const _user: User = {
  id: 0,
  fisrtname: "test",
  lastname: "test",
  username: "test",
  password_digest: "test",
};

const request = supertest(app);
const token: string = createJwtToken(_user);

describe("Users handlers: ", () => {
  it("should create a new user", async () => {
    const data = {
      username: "cong",
      fisrtname: "test",
      lastname: "test",
      password: "cong123",
    };
    await request.post("/user").send(data).expect(201);
  });

  it("should create a user fail if missing username", async () => {
    const data = {
      fisrtname: "cong",
      lastname: "test",
      password: "cong123",
    };
    await request.post("/user").send(data).expect(400);
  });

  it("should get list user", async () => {
    await request
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should get user by id", async () => {
    await request
      .get("/user/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should login success", async () => {
    const data = {
      username: "cong",
      password: "cong123",
    };
    await request.post("/user/login").send(data).expect(200);
  });

  it("should authenticate fail when get list user with no auth", async () => {
    await request.get("/user").expect(401);
  });
});
