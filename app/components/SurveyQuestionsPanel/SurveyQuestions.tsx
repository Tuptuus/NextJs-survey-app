"use client";
import React, { useEffect, useState } from "react";
import QuestionBlock from "./QuestionBlock";
import SurveyActions from "./SurveyActions";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "@/redux/features/questionsSlice";
import { useAppSelector } from "@/redux/store";

interface Question {
  id: string | null;
  surveyId: string | null;
  text: string | null;
  type: string | null;
}

interface Survey {
  id: string | null;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  questions: Question[];
}

const SurveyQuestions: React.FC<Survey> = (item) => {
  const questions = useAppSelector((state) => state.questionsReducer.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setQuestions(item.questions));
  }, [dispatch, item.questions]);
  return (
    <div>
      <SurveyActions actionsOnID={item.id as string} />
      <div className="flex flex-col">
        {questions.map((question: any) => (
          <QuestionBlock
            key={question.id}
            questionTitle={question.text}
            id={question.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestions;
