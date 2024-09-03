"use server";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { login } from "@/actions/login";

export const register = async (data: any) => {
  const { name, email, pass } = data;
  const hashedPass = await bcryptjs.hash(pass, 10);

  const exisitingUser = await getUserByEmail(email);

  if (exisitingUser) {
    console.log("email in use");
    return { success: false, message: "email in use" };
  } else {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });
    return { success: true };
  }
};
