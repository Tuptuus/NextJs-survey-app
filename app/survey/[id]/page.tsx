"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSurveyByID } from "@/data/surveys";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  divider,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

interface option {
  id: string | null;
  text: string | null;
  questionId: string | null;
}

interface Question {
  id: string | null;
  surveyId: string | null;
  title: string | null;
  type: string | null;
  isRequired: boolean;
  options: option[];
}

interface Survey {
  id: string | null;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  questions: Question[];
}

function SurveyAnswerPage() {
  const [currSurvey, setCurrSurvey] = useState<Survey | null>(null);
  const params = useParams();
  useEffect(() => {
    const getSurvey = async () => {
      const survey = await getSurveyByID(params.id as string);
      setCurrSurvey(survey);
    };
    getSurvey();
  }, [params]);
  const questions = currSurvey?.questions.map((item) => (
    <div className="mt-5 border rounded-lg p-5" key={item.id}>
      <p className="text-lg">{item.title}</p>

      {item.type === "SHORTTEXT" ? (
        <Input className="dark" type="text" label="Krótka odpowiedź" />
      ) : null}

      {item.type === "LONGTEXT" ? (
        <Input className="dark" type="text" label="Długa odpowiedź" />
      ) : null}

      <RadioGroup color="warning">
        {item.type === "SINGLECHOICE"
          ? item.options.map((option) => (
              <div key={option.id} className="flex mt-2 dark">
                <Radio value={option.text as string}>{option.text}</Radio>
              </div>
            ))
          : null}
      </RadioGroup>
      {/* {item.type === "SINGLECHOICE"
        ? item.options.map((option) => (
            <div className="flex mt-2" key={option.id}>
              <input
                className="cursor-pointer"
                type="radio"
                name={option.questionId as string}
                id={option.id as string}
              />
              <label
                htmlFor={option.id as string}
                className="pl-2 cursor-pointer"
              >
                {option.text}
              </label>
            </div>
          ))
        : null} */}

      <CheckboxGroup color="warning">
        {item.type === "MULTICHOICE"
          ? item.options.map((option) => (
              <div key={option.id} className="flex mt-2 dark">
                <Checkbox value={option.text as string}>{option.text}</Checkbox>
              </div>
            ))
          : null}
      </CheckboxGroup>

      {/* {item.type === "MULTICHOICE" ? (
        <input type="checkbox" name="" id="" />
      ) : null} */}
    </div>
  ));
  return (
    <div className="text-white flex justify-center">
      <div className="w-[800px] mx-5 mt-5">
        <div className="bg-orange-500 h-20 rounded-lg pl-5 flex flex-col justify-center">
          <p onClick={() => console.log(currSurvey)}>
            {currSurvey ? currSurvey.title : null}
          </p>
          <p>{currSurvey ? currSurvey.description : null}</p>
        </div>
        <div className=" mt-5">
          <div>{questions}</div>
        </div>
        <div className="my-8 flex flex-col items-start">
          <Button className="bg-orange-500 text-white" size="lg">
            ZAPISZ ODPOWIEDZI
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SurveyAnswerPage;
