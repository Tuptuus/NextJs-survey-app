"use client";
import { deleteSurveyByID } from "@/data/surveys";
import React from "react";
import {
  FaPlus,
  FaRegCheckCircle,
  FaRegEye,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdShare } from "react-icons/md";

interface surveyID {
  actionsOnID: string | null;
}

const SurveyActions: React.FC<surveyID> = ({ actionsOnID }) => {
  return (
    <>
      <div className="flex justify-end">
        <div className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer">
          <span className="flex items-center">
            <FaPlus /> Pytanie
          </span>
        </div>
        <div className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer">
          <span className="flex items-center">
            <FaRegEye /> Zobacz
          </span>
        </div>
        <div className="mx-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer">
          <span className="flex items-center">
            <MdShare /> Udostępnij
          </span>
        </div>
        <div className="ml-5 py-3 px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer">
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
