"use client";
import React from "react";
import { Switch, cn } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";
// import { deleteQuestionFromSurvey } from "@/data/surveys";

interface question {
  id: string | null;
  questionTitle: string | null;
  test: () => void;
}

const QuestionBlock: React.FC<question> = (props) => {
  const { questionTitle, id, test } = props;
  const deleteQuestion = (id: string) => {
    test();
  };
  return (
    <>
      <div className="px-6 py-8 border rounded-xl my-8">
        <div className="flex flex-col relative border w-full rounded-xl">
          <label className="absolute pointer-events-none left-4 top-2 text-sm">
            Tytuł pytania
          </label>
          <input
            type="text"
            value={questionTitle !== null ? questionTitle : ""}
            className="bg-transparent px-4 pt-7 pb-3 text-lg outline-none border-none"
          />
        </div>
        <div className="mt-8 border-b border-dashed">
          <p className="text-lg">Pole jakiejś odpowiedzi</p>
        </div>
        <div className="flex mt-8">
          <div className="w-2/3 flex">
            <div className="flex flex-col relative border rounded-xl w-60">
              <label className="absolute left-4 top-2 text-sm">
                Rodzaj pytania
              </label>
              <input
                className="bg-transparent px-4 pt-7 pb-3 text-lg outline-none border-none"
                type="text"
                readOnly
                value={"Krótka odpowiedź"}
              />
            </div>
          </div>
          <div className="w-1/3 flex justify-end items-center text-lg">
            <div
              onClick={() => deleteQuestion(id as string)}
              className="mx-5 cursor-pointer p-3 rounded-xl hover:bg-orange-500 transition-all"
            >
              <FaRegTrashAlt className="text-2xl" />
            </div>
            <div className="">
              <Switch
                color="warning"
                classNames={{ wrapper: cn("bg-gray-500") }}
              >
                <span className="text-white">Wymagane</span>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBlock;
