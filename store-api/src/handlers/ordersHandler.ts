import express, { Request, Response } from "express";
import {
  Order,
  Order_Product,
  OrdersStore,
  StatusEnum,
} from "../models/orders";
import authentication from "../middlewares/authMiddleware";
import { User } from "../models/users";

const store = new OrdersStore();

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    var user = req.body.user as User;
    var userId = user.id;

    var activeOrder = await store.getActiveOrdersByUser(userId);

    if (activeOrder == null || undefined) {
      //create active order
      activeOrder = await store.create({
        id: 0,
        userId: userId,
        status: StatusEnum.active,
      } as Order);
    }

    var result = await store.addProduct({
      id: 0,
      productAmount: req.body.productAmount,
      productId: parseInt(req.params.productId),
      orderId: activeOrder.id,
    } as Order_Product);

    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completeOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    var user = req.body.user as User;
    var userId = user.id;

    var activeOrder = await store.getActiveOrdersByUser(userId);

    if (activeOrder == null) {
      res.json(null);
      return;
    }

    var result = await store.put(activeOrder.id, StatusEnum.completed);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const orderRoutes = (app: express.Application): void => {
  app.post("/orders/addProduct/:productId", authentication, addProduct);
  app.get("/orders/completed", authentication, completeOrder);
};
