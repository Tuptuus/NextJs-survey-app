"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getSurveysByUserID = async (id: string) => {
  try {
    const surveys = await db.survey.findMany({
      where: { surveyToUserID: id },
    });
    return surveys;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSurveyByID = async (id: string) => {
  try {
    const survey = await db.survey.findUnique({
      where: { id: id },
      include: { questions: true },
    });
    return survey;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteSurveyByID = async (id: string) => {
  try {
    await db.survey.delete({ where: { id: id } });
  } catch (err) {
    console.log(err);
  }
  redirect("/dashboard");
};

// export const addQuestionToSurvey = async (id: string) => {
//   try {
//     await db.survey.update({
//       where: { id: id },
//       data: {
//         questions: { create: [{ text: "Nowe pytanie" }] },
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   revalidatePath("/");
// };

// export const deleteQuestionFromSurvey = async (id: string) => {
//   try {
//     await db.question.delete({ where: { id: id } });
//   } catch (err) {
//     console.log(err);
//   }
//   revalidatePath("/");
// };

// const saveQuestionsChanges = async () => {
//   try {
//   } catch (err) {
//     console.log(err);
//   }
// };
