import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import client from "@repo/db/client";
import { authSchema } from "../types";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res.status(401).send("Please send all the details");

    const validationResult = authSchema.parse(req.body);

    console.log(validationResult);

    const isUser = await client.user.findFirst({ where: { email } });

    if (isUser) return res.status(409).send("User already exist");

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await client.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
        isVerfied: true,
      },
    });

    res.status(201).send(User);
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
};
