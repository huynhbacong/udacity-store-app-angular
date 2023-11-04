import client from "../database";
import { Product } from "../models/products";
import logError from "../utilities/logError";

export class DashboardQueries {
  async getFivePopularProducts(): Promise<Array<Product>> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT P.*, SUM(OP.PRODUCT_AMOUNT) AS PRODUCT_AMOUNT FROM PRODUCTS AS P" +
        " LEFT JOIN ORDER_PRODUCTS AS OP ON P.ID = OP.PRODUCT_ID" +
        " GROUP BY P.ID" +
        " ORDER BY SUM(OP.PRODUCT_AMOUNT) DESC" +
        " LIMIT 5";

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err: Error | any) {
      logError(err, `${this.getFivePopularProducts.name}`);
      throw new Error(`unable to get five most popular products: ${err}`);
    }
  }

  async getProductsByCategory(category: number): Promise<Array<Product>> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM PRODUCTS WHERE CATEGORY = $1";

      const result = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (err: Error | any) {
      logError(err, "getProductsByCategory");
      throw new Error(`unable to get products by category: ${err}`);
    }
  }

  async getOrdersWithStatus(userId: number, status: number): Promise<Object> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM ORDERS AS O" +
        " JOIN ORDER_PRODUCTS AS OP ON O.ID = OP.ORDER_ID" +
        " JOIN PRODUCTS AS P ON P.ID = OP.PRODUCT_ID" +
        " WHERE O.USER_ID = $1 AND O.STATUS = $2";

      const query = await conn.query(sql, [userId, status]);
      conn.release();

      const result = {
        orderId: query.rows[0]?.order_id,
        status: query.rows[0]?.status,
        products: query.rows?.map((x): object => {
          return {
            productId: x.product_id,
            price: x.price,
            category: x.category,
            productAmount: x.product_amount,
          };
        }),
      };

      return result;
    } catch (err: Error | any) {
      logError(err, "getOrdersWithStatus");
      throw new Error(`unable to get orders: ${err}`);
    }
  }
}
