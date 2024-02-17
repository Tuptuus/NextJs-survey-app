import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
let email2 = null;
export const importLoginData = (data: any) => {
  const { email } = data;
  email2 = email;
};

console.log(email2);

export default {
  providers: [
    // Credentials({
    //   async authorize(credentials){
    //   }
    // })
  ],
} satisfies NextAuthConfig;
