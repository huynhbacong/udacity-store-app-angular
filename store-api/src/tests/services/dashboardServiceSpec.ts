import { StatusEnum } from "../../models/orders";
import { Product, ProductStore } from "../../models/products";
import { User, UserStore } from "../../models/users";
import { DashboardQueries } from "../../services/dashboardService";

const userStore = new UserStore();
const productStore = new ProductStore();
const store = new DashboardQueries();

let _userId: number;
const _product: Product = {
  id: 0,
  name: "test",
  price: 10.0,
  category: 1,
};

const _user: User = {
  id: 0,
  fisrtname: "test",
  lastname: "test",
  username: "test",
  password_digest: "test",
};

describe("Dashboard models", () => {
  beforeAll(async () => {
    const user = await userStore.create(_user);
    _userId = user.id;
    for (let i = 0; i <= 5; i++) {
      await productStore.create(_product);
    }
  });

  it("getFivePopularProducts method should get 5 products", async () => {
    const result = await store.getFivePopularProducts();
    expect(result.length).toEqual(5);
  });

  it("getOrdersWithStatus method should return a list of orders", async () => {
    const result = await store.getOrdersWithStatus(_userId, StatusEnum.active);
    expect(result).toBeTruthy();
  });

  it("getProductsByCategory method should return a list of products", async () => {
    const result = await store.getProductsByCategory(1);
    expect(result).toEqual([...result]);
  });
});
