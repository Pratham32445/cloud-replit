import client from "@repo/db/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).send("Invalid credentials");

    const { Id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const User = await client.user.findFirst({ where: { Id } });

    if (!User) return res.status(403).send("Invalid credentials");

    if (User.role != "ADMIN")
      return res.status(403).send("Invalid credentials");

    //@ts-ignore
    req.user = User;

    next();
  } catch (error) {
    console.log(error);
  }
};
