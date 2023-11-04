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

describe("Orders handlers: ", () => {
  it("should add new order", async () => {
    const data = {
      productAmount: 123,
    };
    await request
      .post("/orders/addProduct/1")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(200);
  });

  it("should add new order fail if not exist product id", async () => {
    const data = {
      productAmount: 123,
    };
    await request
      .post("/orders/addProduct/100")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(400);
  });

  it("should completed order", async () => {
    await request
      .get("/orders/completed")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
