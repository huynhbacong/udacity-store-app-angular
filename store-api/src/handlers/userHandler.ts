import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import authentication from "../middlewares/authMiddleware";
import { createJwtToken } from "../utilities/helpers";

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const user = await store.show(id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error("Missing username or password");
    }

    const user: User = {
      id: 0,
      fisrtname: req.body.fisrtname,
      lastname: req.body.lastname,
      username: req.body.username,
      password_digest: req.body.password,
    };

    const newUser = await store.create(user);
    const token = createJwtToken(newUser);

    res.status(201).json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const user = await store.authenticate(req.body.username, req.body.password);

    if (user != null) {
      const token = createJwtToken(user);
      res.json(token);
      return;
    }

    res.status(401);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export const userRoutes = (app: express.Application): void => {
  const routes = express.Router();
  routes.get("/", authentication, index);
  routes.get("/:id", authentication, show);
  routes.post("/", create);
  routes.post("/login", login);
  app.use("/user", routes);
};
