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
      questions: {
        create: [
          {
            title: "przykład #1",
            isRequired: false,
            type: "SHORTTEXT",
            options: { create: [{ text: "Opcja 1" }, { text: "Opcja 2" }] },
          },
          {
            title: "przykład #2",
            isRequired: false,
            type: "SINGLECHOICE",
            options: { create: [{ text: "Opcja 1" }, { text: "Opcja 2" }] },
          },
          {
            title: "przykład #2",
            isRequired: false,
            type: "MULTICHOICE",
            options: { create: [{ text: "Opcja A" }, { text: "Opcja B" }] },
          },
        ],
      },
    },
  });
  revalidatePath("/");
};
