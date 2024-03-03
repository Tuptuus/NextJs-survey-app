import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const data = credentials;
        const { email, password, callback } = data;
        if (data) {
          const user = await getUserByEmail(email as string);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcryptjs.compare(
            password as string,
            user.password
          );
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  secret: "test",
} satisfies NextAuthConfig;
