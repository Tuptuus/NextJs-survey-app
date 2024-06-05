"use client";
import SurveyAnswers from "@/app/components/SurveyAnswersPanel/SurveyAnswers";
import SurveyQuestions from "@/app/components/SurveyQuestionsPanel/SurveyQuestions";
import { getSurveyByID } from "@/data/surveys";
import { useCurrentUser } from "@/hooks/currentUser";
import { clearStates } from "@/redux/features/questionsSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface option {
  id: string | null;
  text: string | null;
  questionId: string | null;
}

interface Question {
  id: string | null;
  surveyId: string | null;
  title: string | null;
  type: string | null;
  isRequired: boolean;
  options: option[];
}

interface Survey {
  id: string | null;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  questions: Question[];
}

function SurveyPage() {
  const [currMode, setCurrMode] = useState("questions");
  const [currSurvey, setCurrSurvey] = useState<Survey | null>(null);
  const params = useParams();
  const dispatch = useDispatch();

  const changeDisplayPage = (btn: string) => {
    setCurrMode(btn);
    console.log(currSurvey);
  };

  useEffect(() => {
    dispatch(clearStates());
  }, [dispatch]);

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
        <div
          onClick={() => console.log(currSurvey)}
          className="text-2xl w-1/2  flex items-center py-7"
        >
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
        <div className="w-4/5">
          {currMode == "questions" ? (
            currSurvey && <SurveyQuestions {...currSurvey} />
          ) : (
            <SurveyAnswers />
          )}
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;
