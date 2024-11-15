import { NextFunction, Request, Response } from "express";
import client from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).send("Invalid credentials");

    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    console.log(email);

    const User = await client.user.findFirst({ where: { email } });

    if (!User) return res.status(403).send("Invalid credentials");

    //@ts-ignore
    req.user = User;

    next();
  } catch (error) {
    console.log(error);
  }
};
