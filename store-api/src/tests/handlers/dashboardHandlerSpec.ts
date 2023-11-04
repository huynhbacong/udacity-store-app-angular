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

describe("dashboard handlers: ", () => {
  it("should getFivePopularProducts", async () => {
    await request.get("/top-5-most-popular-products").expect(200);
  });

  it("should getProductsByCategory", async () => {
    await request.get("/products-by-category/1").expect(200);
  });

  it("should getCurrentOrders", async () => {
    await request
      .get("/current-orders")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("should getCompletedOrders", async () => {
    await request
      .get("/completed-orders")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
