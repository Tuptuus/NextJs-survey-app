"use server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const register = async (data: any) => {
  const { name, email, pass } = data;
  const hashedPass = await bcrypt.hash(pass, 10);

  const exisitingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exisitingUser) {
    console.log("email in use");
  } else {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    });
  }
};
