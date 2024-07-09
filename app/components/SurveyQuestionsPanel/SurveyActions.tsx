"use client";
import { useAppSelector } from "@/redux/store";
import short from "short-uuid";
// import { addQuestionToSurvey, deleteSurveyByID } from "@/data/surveys";
import React, { useState } from "react";
import {
  FaPlus,
  FaRegCheckCircle,
  FaRegEye,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addQuestions, setActionAlert } from "@/redux/features/questionsSlice";
import { deleteSurveyByID, saveQuestionsChanges } from "@/data/surveys";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface surveyID {
  actionsOnID: string | null;
}

const SurveyActions: React.FC<surveyID> = ({ actionsOnID }) => {
  const questions = useAppSelector((state) => state.questionsReducer.questions);
  const options = useAppSelector(
    (state) => state.questionsReducer.questionOptions
  );
  const deletedQuestions = useAppSelector(
    (state) => state.questionsReducer.questionsToDelete
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const addQuestionFunction = () => {
    const shortID = short.generate();
    const question = {
      id: shortID,
      title: "test",
      isRequired: false,
      surveyId: actionsOnID,
      type: "SHORTTEXT",
      options: [
        { id: short.generate(), text: "Opcja 1", questionId: shortID },
        { id: short.generate(), text: "Opcja 2", questionId: shortID },
      ],
    };
    dispatch(addQuestions(question));
  };

  const saveChanges = async () => {
    const msg = await saveQuestionsChanges(
      questions,
      deletedQuestions,
      options
    );
    dispatch(setActionAlert(msg));
    setTimeout(() => {
      dispatch(setActionAlert(""));
    }, 4000);
  };
  return (
    <>
      <div className="flex justify-end">
        <div
          onClick={() => addQuestionFunction()}
          className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaPlus /> Pytanie
          </span>
        </div>
        <div className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer">
          <Link href={`/survey/${actionsOnID}`} target="_blank">
            <span
              // onClick={() => router.push(`/survey/${actionsOnID}`)}
              className="flex items-center"
            >
              <FaRegEye /> Zobacz
            </span>
          </Link>
        </div>
        <div
          onClick={() => console.log(questions)}
          className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/survey/${actionsOnID}`
              );
              dispatch(setActionAlert("ℹ️ Skopiowano do schowka"));
              setTimeout(() => {
                dispatch(setActionAlert(""));
              }, 4000);
            }}
            className="flex items-center"
          >
            <MdShare /> Udostępnij
          </span>
        </div>
        <div
          onClick={() => saveChanges()}
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
