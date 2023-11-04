import client from "../database";
import logError from "../utilities/logError";

export enum CategoryEnum {
  Weapon = 1,
  Doll,
}

export interface Product {
  id: number;
  name: string;
  category: CategoryEnum;
  price: number;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM PRODUCTS";

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err: Error | any) {
      logError(err, `${this.index}`);
      throw new Error(`unable to get products: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM PRODUCTS WHERE ID = $1";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err: Error | any) {
      logError(err, `${this.show}`);
      throw new Error(`unable to get product by id: ${err}`);
    }
  }

  async create(item: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO PRODUCTS (name, price, category) VALUES($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [
        item.name,
        item.price,
        item.category as number,
      ]);
      conn.release();

      const product: Product = {
        id: result.rows[0]?.id,
        name: result.rows[0]?.name,
        price: result.rows[0]?.price,
        category: result.rows[0]?.category,
      };

      return product;
    } catch (err: any) {
      logError(err, `${this.create}`);
      throw new Error(`unable create product (${item.name}): ${err}`);
    }
  }
}
