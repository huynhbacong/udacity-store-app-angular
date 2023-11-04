import { Order, Order_Product, OrdersStore } from "../../models/orders";
import { User, UserStore } from "../../models/users";

const store = new OrdersStore();
const userStore = new UserStore();
let _userId: number;

const _order: Order = {
  id: 0,
  userId: 1,
  status: 1,
};

const _user: User = {
  id: 0,
  fisrtname: "test",
  lastname: "test",
  username: "test",
  password_digest: "test",
};

describe("Orders models", () => {
  beforeAll(async () => {
    var user = await userStore.create(_user);
    _userId = user.id;
  });

  it("create method should add a order", async () => {
    var order: Order = {
      id: 0,
      userId: _userId,
      status: 1,
    };
    const result = await store.create(order);
    expect(result).toBeTruthy();
  });

  it("getActiveOrdersByUser method should get order", async () => {
    var order: Order = {
      id: 0,
      userId: _userId,
      status: 1,
    };
    const newOrder = await store.create(order);
    const result = await store.getActiveOrdersByUser(newOrder.userId);
    expect(result.userId.toString()).toEqual(order.userId.toString());
    expect(result.status.toString()).toEqual(newOrder.status.toString());
  });

  it("put method should update a order", async () => {
    var order: Order = {
      id: 0,
      userId: _userId,
      status: 1,
    };
    const newOrder = await store.create(order);
    const result = await store.put(newOrder.id, 2);
    expect(result.status).toBe(2);
  });

  it("addProduct method should add a product to order", async () => {
    var order: Order = {
      id: 0,
      userId: _userId,
      status: 1,
    };
    const newOrder = await store.create(order);
    const order_product: Order_Product = {
      id: 0,
      productAmount: 12,
      orderId: newOrder.id,
      productId: 1,
    };
    const result = await store.addProduct(order_product);
    expect(result.productAmount).toBe(order_product.productAmount);
    expect(result.orderId.toString()).toBe(order_product.orderId.toString());
    expect(result.productId.toString()).toBe(
      order_product.productId.toString(),
    );
  });
});
