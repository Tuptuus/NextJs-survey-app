"use server";
import { db } from "@/lib/db";

export const createSurvey = async (data: any) => {
  const { surveyToUserID, title, description } = data;
  await db.survey.create({
    data: {
      surveyToUserID,
      title,
      description,
    },
  });
};
