"use client";
import { useAppSelector } from "@/redux/store";
import short from "short-uuid";
// import { addQuestionToSurvey, deleteSurveyByID } from "@/data/surveys";
import React from "react";
import {
  FaPlus,
  FaRegCheckCircle,
  FaRegEye,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addQuestions } from "@/redux/features/questionsSlice";
import { deleteSurveyByID, saveQuestionsChanges } from "@/data/surveys";

interface surveyID {
  actionsOnID: string | null;
}

const SurveyActions: React.FC<surveyID> = ({ actionsOnID }) => {
  const questions = useAppSelector((state) => state.questionsReducer.questions);
  const deletedQuestions = useAppSelector(
    (state) => state.questionsReducer.questionsToDelete
  );
  const dispatch = useDispatch();
  const test = () => {
    const shortID = short.generate();
    const question = {
      id: shortID,
      text: "test",
      isRequired: false,
      surveyId: actionsOnID,
      type: "SHORTTEXT",
    };
    dispatch(addQuestions(question));
  };
  return (
    <>
      <div className="flex justify-end">
        <div
          onClick={() => test()}
          className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaPlus /> Pytanie
          </span>
        </div>
        <div className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer">
          <span className="flex items-center">
            <FaRegEye /> Zobacz
          </span>
        </div>
        <div
          onClick={() => console.log(questions)}
          className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <MdShare /> Udostępnij
          </span>
        </div>
        <div
          onClick={() => saveQuestionsChanges(questions, deletedQuestions)}
          className="ml-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaRegCheckCircle /> Zapisz
          </span>
        </div>
        <div
          onClick={() => deleteSurveyByID(actionsOnID as string)}
          className="ml-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaRegTrashAlt /> Usuń
          </span>
        </div>
      </div>
    </>
  );
};

export default SurveyActions;
