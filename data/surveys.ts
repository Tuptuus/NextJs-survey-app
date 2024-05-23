"use server";
import { db } from "@/lib/db";

export const getSurveysByUserID = async (id: string) => {
  try {
    const surveys = await db.survey.findMany({ where: { surveyToUserID: id } });
    return surveys;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getSurveyByID = async (id: string) => {
  try {
    const survey = await db.survey.findUnique({ where: { id: id } });
    return survey;
  } catch (err) {
    console.log(err);
    return null;
  }
};
