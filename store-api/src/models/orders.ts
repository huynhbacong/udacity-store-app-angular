import client from "../database";
import logError from "../utilities/logError";

export enum StatusEnum {
  active = 1,
  completed,
}

export interface Order {
  id: number;
  userId: number;
  status: StatusEnum;
}

export interface Order_Product {
  id: number;
  productAmount: number;
  orderId: number;
  productId: number;
}

export class OrdersStore {
  async getActiveOrdersByUser(userId: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM ORDERS WHERE user_id = $1 AND status = $2";
      const result = await conn.query(sql, [userId, StatusEnum.active]);

      conn.release();

      const order: Order = {
        id: result.rows[0]?.id,
        userId: result.rows[0]?.user_id,
        status: result.rows[0]?.status,
      };

      return order;
    } catch (err: Error | any) {
      logError(err, `${this.getActiveOrdersByUser}`);
      throw new Error(`unable to get product by user: ${err}`);
    }
  }

  async put(orderId: number, status: StatusEnum): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "UPDATE ORDERS SET status = $1 WHERE id = $2 RETURNING *";

      const result = await conn.query(sql, [status as number, orderId]);
      const order: Order = {
        id: result.rows[0]?.id,
        userId: result.rows[0]?.user_id,
        status: result.rows[0]?.status,
      };

      conn.release();

      return order;
    } catch (err: any) {
      logError(err, `${this.put}`);
      throw new Error(`unable update order (${orderId}): ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO ORDERS (user_id, status) VALUES($1, $2) RETURNING *";

      const result = await conn.query(sql, [order.userId, order.status]);
      const newOrder: Order = {
        id: result.rows[0]?.id,
        userId: result.rows[0]?.user_id,
        status: result.rows[0]?.status,
      };

      conn.release();

      return newOrder;
    } catch (err: any) {
      logError(err, `${this.create}`);
      throw new Error(`unable create order (${order.userId}): ${err}`);
    }
  }

  async addProduct(request: Order_Product): Promise<Order_Product> {
    try {
      const sql =
        "INSERT INTO order_products (product_amount, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [
        request.productAmount,
        request.orderId,
        request.productId,
      ]);

      const order: Order_Product = {
        id: result.rows[0]?.id,
        productId: result.rows[0]?.product_id,
        productAmount: result.rows[0]?.product_amount,
        orderId: result.rows[0]?.order_id,
      };

      conn.release();

      return order;
    } catch (err: Error | any) {
      logError(err, `${this.addProduct}`);
      throw new Error(
        `Could not add product ${request.productId} to order ${request.orderId}: ${err}`,
      );
    }
  }
}
