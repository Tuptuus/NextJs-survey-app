"use client";
import React, { useEffect, useState } from "react";
import { Switch, cn } from "@nextui-org/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  updateQuestionRequired,
  updateQuestionTitle,
} from "@/redux/features/questionsSlice";
import { useAppSelector } from "@/redux/store";

interface question {
  id: string | null;
  questionTitle: string | null;
  isRequired: boolean;
  surveyId: string | null;
  type: string | null;
}

const QuestionBlock: React.FC<question> = (props) => {
  const dispatch = useDispatch();
  const { questionTitle, id, isRequired } = props;
  const [questionTitleValue, setQuestionTitleValue] = useState(questionTitle);
  const questions = useAppSelector((state) => state.questionsReducer.questions);
  const thisQuestion = questions.filter((item: any) => item.id === id);
  const [switchIsRequired, setSwitchIsRequired] = useState(isRequired);

  const handleInput = (e: any) => {
    setQuestionTitleValue(e.target.value);
    dispatch(updateQuestionTitle({ id, title: e.target.value }));
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
