import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(4, "Username must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
