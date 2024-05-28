"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createSurvey = async (data: any) => {
  const { surveyToUserID, title, description, createdAt } = data;
  const survey = await db.survey.create({
    data: {
      surveyToUserID,
      title,
      description,
      createdAt,
      questions: {
        create: [
          { text: "przykład #1" },
          { text: "przykład #2" },
          { text: "przykład #3" },
        ],
      },
    },
    include: { questions: true },
  });
  console.log(survey);
  revalidatePath("/");
};
