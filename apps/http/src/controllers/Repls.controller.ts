import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { copyS3Folder } from "../aws";
import client from "@repo/db/client";

export const createRepl = async (req: Request, res: Response) => {
  try {
    const { template, templateId } = req.body;

    const replId = uuidv4();

    if (await copyS3Folder(template, replId)) {
      const result = await client.repls.create({
        data: {
          templateId,
          Id: replId,
          // @ts-ignore
          userId: req.user.Id,
        },
      });

      if (result) return res.status(201).send(result.Id);
    }
    return res.status(401).send("some error occured");
  } catch (error) {
    console.log(error);
    return res.status(401).send("some error occured");
  }
};

export const getAllLanguages = async (req: Request, res: Response) => {
  try {
    const result = await client.template.findMany();
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
  }
};
