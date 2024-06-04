"use client";
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

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
  if (type === "SINGLECHOICE") {
    return (
      <>
        <p className="text-lg border-b border-dashed">
          Pole jednokrotnego wyboru
        </p>
        <div className="mt-5">
          {options.map((item: any) => (
            <div key={item.id} className="flex items-center mt-2">
              <div className="bg-gray-800 border-gray-500 border-2 w-5 h-5 rounded-full"></div>
              <input
                type="text"
                required
                minLength={1}
                className="bg-transparent outline-none ml-2 border-b-2 border-transparent focus:border-orange-500 p-1 w-40"
                value={item.text}
              />
            </div>
          ))}
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
          {options.map((item: any) => (
            <div key={item.id} className="flex items-center mt-2">
              <div className="bg-gray-800 border-gray-500 border-2 w-5 h-5 rounded-md"></div>
              <input
                type="text"
                required
                minLength={1}
                className="bg-transparent outline-none ml-2 border-b-2 border-transparent focus:border-orange-500 p-1 w-40"
                value={item.text}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default QuestionOptions;
