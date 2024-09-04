"use client";
import {
  updateQuestionOptionText,
  deleteOptionAction,
  addOptionAction,
} from "@/redux/features/questionsSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import short from "short-uuid";

interface option {
  id: string | null;
  text: string | null;
}

interface optionProps {
  options: option[];
  type: string | null;
  questionID: string | null;
}

const QuestionOptions: React.FC<optionProps> = (props) => {
  const { options, type, questionID } = props;
  const [optionsState, setOptionsState] = useState(options);
  const dispatch = useDispatch();

  useEffect(() => {
    setOptionsState(options);
  }, [options]);

  const handleOptionsInput = (id: string, text: string) => {
    const updatedOptions = optionsState.map((option) =>
      option.id === id ? { ...option, text } : option
    );
    setOptionsState(updatedOptions);
    dispatch(updateQuestionOptionText({ id, text }));
  };

  const deleteOption = (item: any) => {
    const newOptions = optionsState.filter((option) => option.id != item.id);
    setOptionsState(newOptions);
    dispatch(deleteOptionAction(item.id));
  };

  const createNewOption = () => {
    const newOption = {
      id: short.generate(),
      text: "Nowa opcja",
      questionId: questionID,
    };
    let currOptions = optionsState;
    let newOptions = currOptions.concat(newOption);
    setOptionsState(newOptions);
    dispatch(addOptionAction(newOption));
  };

  if (type === "SINGLECHOICE") {
    return (
      <>
        <p className="text-lg border-b border-dashed">
          Pole jednokrotnego wyboru
        </p>
        <div className="mt-5">
          {optionsState.map((item: any) => (
            <div key={item.id} className="flex items-center mt-2">
              <div className="bg-gray-800 border-gray-500 border-2 w-5 h-5 rounded-full"></div>
              <input
                type="text"
                required
                minLength={1}
                className="bg-transparent outline-none ml-2 border-b-2 border-transparent focus:border-orange-500 p-1 w-40"
                value={item.text}
                onChange={(e) => handleOptionsInput(item.id, e.target.value)}
              />
              {optionsState.length > 1 ? (
                <div
                  onClick={() => deleteOption(item)}
                  className="mx-2 cursor-pointer p-2 rounded-lg hover:bg-orange-500 transition-all"
                >
                  <FaRegTrashAlt />
                </div>
              ) : null}
            </div>
          ))}
          {optionsState.length < 20 ? (
            <span
              onClick={() => createNewOption()}
              className="cursor-pointer text-orange-400 hover:underline"
            >
              Dodaj opcję
            </span>
          ) : null}
        </div>
      </>
    );
  } else if (type === "MULTICHOICE") {
    return (
      <>
        <p className="text-lg border-b border-dashed">
          Pole wielokrotnego wyboru
        </p>
        <div className="mt-5">
          {optionsState.map((item: any) => (
            <div key={item.id} className="flex items-center mt-2">
              <div className="bg-gray-800 border-gray-500 border-2 w-5 h-5 rounded-md"></div>
              <input
                type="text"
                required
                minLength={1}
                className="bg-transparent outline-none ml-2 border-b-2 border-transparent focus:border-orange-500 p-1 w-40"
                value={item.text}
                onChange={(e) => handleOptionsInput(item.id, e.target.value)}
              />
              {optionsState.length > 1 ? (
                <div
                  onClick={() => deleteOption(item)}
                  className="mx-2 cursor-pointer p-2 rounded-lg hover:bg-orange-500 transition-all"
                >
                  <FaRegTrashAlt />
                </div>
              ) : null}
            </div>
          ))}
          <span
            onClick={() => createNewOption()}
            className="cursor-pointer text-orange-400 hover:underline"
          >
            Dodaj opcję
          </span>
        </div>
      </>
    );
  }
};

export default QuestionOptions;
