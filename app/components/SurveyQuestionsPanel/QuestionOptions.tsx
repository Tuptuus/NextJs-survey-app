"use client";
import {
  setQuestionOptions,
  updateQuestionOptionText,
} from "@/redux/features/questionsSlice";
import { useAppSelector } from "@/redux/store";
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface option {
  id: string | null;
  text: string | null;
}

interface optionProps {
  options: option[];
  type: string | null;
}

const QuestionOptions: React.FC<optionProps> = (props) => {
  const { options, type } = props;
  const [optionsState, setOptionsState] = useState(options);
  const test = useAppSelector(
    (state) => state.questionsReducer.questionOptions
  );
  const dispatch = useDispatch();

  const handleOptionsInput = (id: string, text: string) => {
    const updatedOptions = optionsState.map((option) =>
      option.id === id ? { ...option, text } : option
    );
    setOptionsState(updatedOptions);
    dispatch(updateQuestionOptionText({ id, text }));
  };
  console.log(test);

  if (type === "SINGLECHOICE") {
    return (
      <>
        <p
          onClick={() => console.log(test)}
          className="text-lg border-b border-dashed"
        >
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
            </div>
          ))}
          <span className="cursor-pointer text-orange-400 hover:underline">
            Dodaj opcję
          </span>
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
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default QuestionOptions;
