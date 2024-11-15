import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest, res: NextResponse) {
  let authToken = req.cookies.get("authToken");
  let response;
  if (!authToken) {
    const User = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    let token = jwt.sign({ email: User?.email }, process.env.NEXTAUTH_SECRET!);
    response = NextResponse.json({ message: "Token set successfully", token });
    response.cookies.set("authToken", token, {
      httpOnly: false,
    });
  } else {
    const token = req.cookies.get("authToken");
    response = NextResponse.json({ message: "Token set successfully", token });
  }
  return response;
}
