/*
    Top 5 most popular products 
    Products by category (args: product category)
    Current Order by user 
    Completed Orders by user (args: user id)[token required]
 */
import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboardService";
import { CategoryEnum } from "../models/products";
import { getCategoryNumber } from "../utilities/helpers";
import authentication from "../middlewares/authMiddleware";
import { User } from "../models/users";
import { StatusEnum } from "../models/orders";

const store = new DashboardQueries();

const getFivePopularProducts = async (req: Request, res: Response) => {
  try {
    var result = await store.getFivePopularProducts();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    var category = getCategoryNumber(req.params.category);
    var result = await store.getProductsByCategory(category);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getCurrentOrders = async (req: Request, res: Response) => {
  try {
    var user = req.body.user as User;
    var userId = user.id;
    var result = await store.getOrdersWithStatus(userId, StatusEnum.active);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getCompletedOrders = async (req: Request, res: Response) => {
  try {
    var user = req.body.user as User;
    var userId = user.id;
    var result = await store.getOrdersWithStatus(userId, StatusEnum.completed);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const dashboardRoutes = (app: express.Application): void => {
  app.get("/top-5-most-popular-products", getFivePopularProducts);
  app.get("/products-by-category/:category", getProductsByCategory);
  app.get("/current-orders", authentication, getCurrentOrders);
  app.get("/completed-orders", authentication, getCompletedOrders);
};
