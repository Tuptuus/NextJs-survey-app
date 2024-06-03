"use client";
import React, { useEffect, useState } from "react";
import { Switch, cn } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  changeQuestionType,
  deleteQuestion,
  updateQuestionRequired,
  updateQuestionTitle,
} from "@/redux/features/questionsSlice";
import { useAppSelector } from "@/redux/store";

interface option {
  id: string | null;
  text: string | null;
}

interface question {
  id: string | null;
  questionTitle: string | null;
  isRequired: boolean;
  surveyId: string | null;
  type: string | null;
  options: option[];
}

const QuestionBlock: React.FC<question> = (props) => {
  const dispatch = useDispatch();
  const { questionTitle, id, isRequired, type } = props;
  const [questionTitleValue, setQuestionTitleValue] = useState(questionTitle);
  const [switchIsRequired, setSwitchIsRequired] = useState(isRequired);
  const [changeQuestionTypeOpen, setChangeQuestionTypeOpen] = useState(false);
  const [currQuestionType, setCurrQuestionType] = useState(type);
  // const questions = useAppSelector((state) => state.questionsReducer.questions);
  // const thisQuestion = questions.filter((item: any) => item.id === id);

  const handleInput = (e: any) => {
    setQuestionTitleValue(e.target.value);
    dispatch(updateQuestionTitle({ id, title: e.target.value }));
  };

  const handleQuestionType = (passType: string) => {
    setCurrQuestionType(passType);
    dispatch(changeQuestionType({ id, type: passType }));
    setChangeQuestionTypeOpen(false);
  };

  // const handleSwitchUpdate = () => {
  //   dispatch(updateQuestionRequired({ id, isRequired: switchIsRequired }));
  //   console.log(switchIsRequired);
  // };

  useEffect(() => {
    dispatch(updateQuestionRequired({ id, isRequired: switchIsRequired }));
  }, [switchIsRequired, dispatch, id]);

  // useEffect(() => {
  //   console.log(questions);
  // }, [questions]);
  return (
    <>
      <div className="px-6 py-8 border rounded-xl my-8">
        <div className="flex flex-col relative border w-full rounded-xl">
          <label className="absolute pointer-events-none left-4 top-2 text-sm">
            Tytuł pytania
          </label>
          <input
            type="text"
            onChange={handleInput}
            value={questionTitleValue !== null ? questionTitleValue : ""}
            className="bg-transparent px-4 pt-7 pb-3 text-lg outline-none border-none"
          />
        </div>
        <div className="mt-8 border-b border-dashed">
          {currQuestionType === "SHORTTEXT" ? (
            <p className="text-lg">Pole krótkiej odpowiedzi</p>
          ) : null}
          {currQuestionType === "LONGTEXT" ? (
            <p className="text-lg">Pole długiej odpowiedzi</p>
          ) : null}
          {currQuestionType === "MULTICHOICE" ? (
            <p className="text-lg">Pole wielokrotnego wyboru</p>
          ) : null}
          {currQuestionType === "SINGLECHOICE" ? (
            <p className="text-lg">Pole jednokrotnego wyboru</p>
          ) : null}
        </div>
        <div className="flex mt-8">
          <div className="w-2/3 flex relative">
            {changeQuestionTypeOpen ? (
              <div className="bg-gray-800 border w-60 absolute rounded-xl -top-52 left-0 z-10">
                <p
                  onClick={() => handleQuestionType("SHORTTEXT")}
                  className="m-2 p-2 hover:bg-orange-500 rounded-xl cursor-pointer transition-all"
                >
                  Krótka odpowiedź
                </p>
                <p
                  onClick={() => handleQuestionType("LONGTEXT")}
                  className="m-2 p-2 hover:bg-orange-500 rounded-xl cursor-pointer transition-all"
                >
                  Długa odpowiedź
                </p>
                <p
                  onClick={() => handleQuestionType("SINGLECHOICE")}
                  className="m-2 p-2 hover:bg-orange-500 rounded-xl cursor-pointer transition-all"
                >
                  Jednokrotny wybór
                </p>
                <p
                  onClick={() => handleQuestionType("MULTICHOICE")}
                  className="m-2 p-2 hover:bg-orange-500 rounded-xl cursor-pointer transition-all"
                >
                  Wielokrotny wybór
                </p>
              </div>
            ) : null}
            <div
              onClick={() => setChangeQuestionTypeOpen(!changeQuestionTypeOpen)}
              className="flex flex-col border rounded-xl w-60 cursor-pointer pl-5 z-0"
            >
              <div className="">
                <span className="text-sm select-none">Rodzaj pytania</span>
              </div>
              <div className=" pt-1 pb-2">
                <span className="text-lg select-none">
                  {currQuestionType === "SHORTTEXT" ? "Krótka odpowiedź" : null}
                  {currQuestionType === "LONGTEXT" ? "Długa odpowiedź" : null}
                  {currQuestionType === "SINGLECHOICE"
                    ? "Jednokrotny wybór"
                    : null}
                  {currQuestionType === "MULTICHOICE"
                    ? "Wielokrotny wybór"
                    : null}
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex justify-end items-center text-lg">
            <div
              // onClick={() => dispatch(deleteQuestion(id))}
              onClick={() => console.log(props)}
              className="mx-5 cursor-pointer p-3 rounded-xl hover:bg-orange-500 transition-all"
            >
              <FaRegTrashAlt className="text-2xl" />
            </div>
            <div className="">
              <Switch
                isSelected={switchIsRequired}
                onValueChange={setSwitchIsRequired}
                // onChange={handleSwitchUpdate}
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
