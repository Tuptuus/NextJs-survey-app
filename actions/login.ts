"use server";
import { db } from "@/lib/db";
import { LoginData } from "@/app/auth/login/page";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (data: any) => {
  const { email, password } = data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (err) {}
};
