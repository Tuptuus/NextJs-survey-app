"use server";
import { signIn } from "@/auth";

export const login = async (data: any) => {
  const { email, pass } = data;
  try {
    await signIn("credentials", {
      email,
      password: pass,
      redirect: false,
    });
  } catch (err) {
    console.log(err);
  }
};
