import { Product, ProductStore } from "../../models/products";

const store = new ProductStore();

const _product: Product = {
  id: 0,
  name: "test",
  price: 10.0,
  category: 1,
};

describe("Products models", () => {
  it("create method should add a product", async () => {
    const result = await store.create(_product);
    expect(result).toBeTruthy();
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(typeof result[0]).toBe(typeof _product);
  });

  it("show method should return a product object", async () => {
    const newProduct = await store.create(_product);
    const result = await store.show(newProduct.id);
    expect(result?.name).toBe(newProduct.name);
    expect(result?.price).toBe(newProduct.price);
    expect(result?.category).toBe(newProduct.category);
  });
});
