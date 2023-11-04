import supertest from "supertest";
import app from "../../server";
import { createJwtToken } from "../../utilities/helpers";
import { Product } from "../../models/products";
import { User } from "../../models/users";

const _user: User = {
  id: 0,
  fisrtname: "test",
  lastname: "test",
  username: "test",
  password_digest: "test",
};

const _product: Product = {
  id: 0,
  name: "test",
  price: 10.0,
  category: 1,
};

const request = supertest(app);
const token: string = createJwtToken(_user);

describe("Products handlers: ", () => {
  it("should create a new product", async () => {
    const data = {
      productName: "Anaconda",
      price: 100.0,
      category: "Weapon",
    };
    await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(201);
  });

  it("should create a user fail if missing price", async () => {
    const data = {
      productName: "Anaconda",
      category: "Weapon",
    };

    await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(400);
  });

  it("should get list product", async () => {
    await request.get("/products").expect(200);
  });

  it("should get product by id", async () => {
    await request
      .get("/products/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
