import client from "../database";
import bcrypt from "bcrypt";
import logError from "../utilities/logError";

export interface User {
  id: number;
  fisrtname?: string;
  lastname?: string;
  username: string;
  password_digest: string;
}

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM USERS";

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err: Error | any) {
      logError(err, `${this.index}`);
      throw new Error(`unable to get users: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM USERS WHERE ID = $1";

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err: Error | any) {
      logError(err, `${this.show}`);
      throw new Error(`unable to get user by id: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (userName, firstName, lastName, password_digest) VALUES($1, $2, $3, $4) RETURNING *";

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds),
      );

      const result = await conn.query(sql, [
        u.username,
        u.fisrtname,
        u.lastname,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err: any) {
      logError(err, `${this.create}`);
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE username=($1)";

      const result = await conn.query<User>(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (err: any) {
      logError(err, `${this.authenticate}`);
      throw new Error(`unable authenticate user (${username}): ${err}`);
    }
  }
}
