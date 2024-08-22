"use server";
import { db } from "@/lib/db";
import { create } from "domain";
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
      include: { questions: { include: { options: true } } },
    });
    return survey;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSurveyByIDforAnswers = async (id: string) => {
  try {
    const survey = await db.survey.findUnique({
      where: { id: id },
      include: { questions: { include: { options: true, answer: true } } },
    });
    return survey;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getResponses = async (id: string) => {
  try {
    const responses = await db.response.findMany({ where: { surveyId: id } });
    console.log(responses);
    return responses;
  } catch (error) {
    console.log(error);
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

export const saveQuestionsChanges = async (
  questions: any,
  deletedQuestions: any,
  options: any
) => {
  try {
    const deleteAll = questions.concat(deletedQuestions);
    questions.forEach((obj: any) => {
      delete obj.options;
    });
    const idsToDelete = deleteAll.map((item: any) => item.id);
    await db.question.deleteMany({ where: { id: { in: idsToDelete } } });
    await db.question.createMany({ data: questions });
    await db.option.createMany({ data: options });
    return "✅ Zapisano zmiany";
  } catch (err) {
    console.log(err);
    return "Wystąpił nieznany błąd";
  }
};

export const saveAnswers = async (
  surveyID: string,
  userID: string,
  answers: any
) => {
  try {
    await db.response.create({
      data: {
        surveyId: surveyID,
        userId: userID,
        answers: {
          create: answers.map((answer: any) => ({
            questionId: answer.questionId,
            questionType: answer.questionType,
            answerText: answer.answerText || null,
            answerOptions: answer.answerOptions || null,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  redirect(`/survey/${surveyID}/surveyResponse`);
};
