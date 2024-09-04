"use server";
import { signIn } from "@/auth";

export const login = async (data: any) => {
  const { email, password } = data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (err) {
    console.log(err);
  }
};
