import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const client = new S3Client({
  region: process.env.REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
});

export const saveToS3 = async (key: string, newContent: string) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: newContent,
    };
    await client.send(new PutObjectCommand(params));
  } catch (error) {
    console.log("Error", error);
  }
};
