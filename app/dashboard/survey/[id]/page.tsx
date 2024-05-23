"use client";
import SideBar from "@/app/components/SideBar";
import SurveyAnswers from "@/app/components/SurveyAnswers";
import SurveyQuestions from "@/app/components/SurveyQuestions";
import { getSurveyByID } from "@/data/surveys";
import { useCurrentUser } from "@/hooks/currentUser";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Survey {
  id: string | null;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
}

function SurveyPage() {
  const [currMode, setCurrMode] = useState("questions");
  const [currSurvey, setCurrSurvey] = useState<Survey | null>(null);
  const params = useParams();

  const changeDisplayPage = (btn: string) => {
    setCurrMode(btn);
    console.log(currSurvey);
  };

  useEffect(() => {
    const getSurvey = async () => {
      const survey = await getSurveyByID(params.id as string);
      setCurrSurvey(survey);
    };
    getSurvey();
  }, [params]);

  return (
    <div className="text-white flex flex-col">
      <div>
        <div className="text-2xl w-1/2  flex items-center py-7">
          Ankieta: {currSurvey ? currSurvey.title : null}
        </div>
      </div>
      <div className="flex">
        <div className="text-white w-1/5">
          <div className="">
            <div
              onClick={() => changeDisplayPage("questions")}
              className={`cursor-pointer py-3 rounded-xl pl-3 w-52 ${
                currMode == "questions" ? "bg-orange-500" : ""
              } transition-all`}
            >
              Pytania
            </div>
            <div
              onClick={() => changeDisplayPage("answers")}
              className={`cursor-pointer py-3 rounded-xl pl-3 w-52 mt-3 ${
                currMode == "answers" ? "bg-orange-500" : ""
              } transition-all`}
            >
              Odpowiedzi
            </div>
          </div>
        </div>
        <div className="bg-red-500 w-4/5">
          {currMode == "questions" ? <SurveyQuestions /> : <SurveyAnswers />}
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;
