import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaRegEye, FaRegCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { Switch } from "@nextui-org/switch";
import QuestionBlock from "./QuestionBlock";

function SurveyQuestions() {
  return (
    <div>
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
      </div>
      <div className="flex flex-col">
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
        <QuestionBlock />
      </div>
    </div>
  );
}

export default SurveyQuestions;
