"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createSurvey = async (data: any) => {
  const { surveyToUserID, title, description, createdAt } = data;
  await db.survey.create({
    data: {
      surveyToUserID,
      title,
      description,
      createdAt,
    },
  });
  revalidatePath("/");
};
