import express, { Request, Response } from "express";
import { CategoryEnum, Product, ProductStore } from "../models/products";
import { getCategoryNumber } from "../utilities/helpers";
import authentication from "../middlewares/authMiddleware";

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await store.show(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      id: 0,
      name: req.body.productName,
      price: req.body.price,
      category: getCategoryNumber(req.body.category) as CategoryEnum,
    };

    const isCreated = await store.create(product);
    res.status(201).json(isCreated);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const productRoutes = (app: express.Application): void => {
  const routes = express.Router();
  routes.get("/", index);
  routes.get("/:id", show);
  routes.post("/", authentication, create);
  app.use("/products", routes);
};
