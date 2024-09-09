import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Nie podano emaila lub hasła");
        }

        const user = await getUserByEmail(email as string);

        if (!user || !user.password) {
          throw new Error("Nieprawidłowy email lub hasło");
        }

        const passwordsMatch = await bcryptjs.compare(
          password as string,
          user.password
        );

        if (!passwordsMatch) {
          throw new Error("Nieprawidłowy email lub hasło");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
