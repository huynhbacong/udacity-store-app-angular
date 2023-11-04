import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/users";

export interface userPayload extends JwtPayload {
  user: User;
}

const authentication = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  const authorizationHeader = req.headers?.authorization as string;
  const token = authorizationHeader?.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  const result = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
  ) as userPayload;
  req.body.user = result.user;
  next();
};

export default authentication;
