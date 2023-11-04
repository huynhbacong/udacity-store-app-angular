import jwt from "jsonwebtoken";
import { CategoryEnum } from "../models/products";
import { User } from "../models/users";

export const getCategoryNumber = (category: string): number =>
  (isNaN(Number(category))
    ? CategoryEnum[category as any]
    : Number(category)) as number;

export const createJwtToken = (user: User) =>
  jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
