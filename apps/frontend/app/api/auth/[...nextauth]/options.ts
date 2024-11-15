import client  from "@repo/db/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "Enter email" },
        password: { type: "password", placeholder: "Enter password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        const isUser = await client.user.findFirst({ where: { email } });
        if (isUser) return isUser;
        const newUser = await client.user.create({ data: { email, password } });
        return newUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      if (!email) return;
      const isUser = await client.user.findFirst({ where: { email } });
      if (isUser) return isUser;
      const User = await client.user.create({ data: { email } });
      return User;
    },
  },
};
