"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSurveyByID, saveAnswers } from "@/data/surveys";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Spinner,
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

interface Answer {
  questionId: string;
  questionType: string;
  answerText?: string;
  answerOptions: string[];
}

function SurveyAnswerPage() {
  const [currSurvey, setCurrSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [sendLoading, setSendLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getSurvey = async () => {
      const survey = await getSurveyByID(params.id as string);
      setCurrSurvey(survey);
    };
    getSurvey();
  }, [params]);

  const handleInputsChange = (
    questionId: string,
    questionType: string,
    value: string
  ) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (ans) => ans.questionId === questionId
      );
      if (existingAnswer) {
        return prevAnswers.map((ans) =>
          ans.questionId === questionId
            ? { ...ans, questionType, answerText: value }
            : ans
        );
      }
      return [
        ...prevAnswers,
        { questionId, questionType, answerText: value, answerOptions: [] },
      ];
    });
  };

  const handleOptionsChange = (
    questionId: string,
    questionType: string,
    values: string[]
  ) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (ans) => ans.questionId === questionId
      );
      if (existingAnswer) {
        return prevAnswers.map((ans) =>
          ans.questionId === questionId
            ? { ...ans, questionType, answerOptions: values }
            : ans
        );
      }
      return [
        ...prevAnswers,
        { questionId, questionType, answerOptions: values },
      ];
    });
  };

  const validateAnswers = () => {
    const missingAnswers: string[] = [];
    currSurvey?.questions.forEach((question) => {
      const answer = answers.find((ans) => ans.questionId === question.id);
      if (question.isRequired) {
        if (
          question.type === "SHORTTEXT" ||
          question.type === "LONGTEXT" ||
          question.type === "SINGLECHOICE"
        ) {
          if (!answer || !answer.answerText) {
            missingAnswers.push(
              `Brak odpowiedzi na pytanie: ${question.title}`
            );
          }
        } else if (question.type === "MULTICHOICE") {
          if (!answer || answer.answerOptions.length === 0) {
            missingAnswers.push(
              `Brak odpowiedzi na pytanie: ${question.title}`
            );
          }
        }
      }
    });
    setErrors(missingAnswers);
    setTimeout(() => {
      setErrors([]);
    }, 5000);
    return missingAnswers.length === 0;
  };

  const handleSubmit = async () => {
    if (validateAnswers()) {
      setSendLoading(true);
      await saveAnswers(
        currSurvey?.id as string,
        currSurvey?.surveyToUserID as string,
        answers
      );
      setSendLoading(false);
    }
  };

  const questions = currSurvey?.questions.map((item) => (
    <div className="mt-5 border rounded-lg p-5" key={item.id}>
      <p className="text-lg">
        {item.title}
        {item.isRequired ? <span className="text-red-500">*</span> : null}
      </p>

      {item.type === "SHORTTEXT" ? (
        <Input
          className="dark mt-2"
          type="text"
          label="Krótka odpowiedź"
          onChange={(e) =>
            handleInputsChange(
              item.id as string,
              item.type as string,
              e.target.value
            )
          }
        />
      ) : null}

      {item.type === "LONGTEXT" ? (
        <Input
          className="dark mt-2"
          type="text"
          label="Długa odpowiedź"
          onChange={(e) => {
            handleInputsChange(
              item.id as string,
              item.type as string,
              e.target.value
            );
          }}
        />
      ) : null}

      {item.type === "SINGLECHOICE" && (
        <RadioGroup
          color="warning"
          onChange={(e) =>
            handleInputsChange(
              item.id as string,
              "SINGLECHOICE",
              e.target.value
            )
          }
        >
          {item.options.map((option) => (
            <div key={option.id} className="flex mt-2 dark">
              <Radio value={option.text as string}>{option.text}</Radio>
            </div>
          ))}
        </RadioGroup>
      )}

      <CheckboxGroup
        color="warning"
        onChange={(values) =>
          handleOptionsChange(item.id as string, "MULTICHOICE", values)
        }
      >
        {item.type === "MULTICHOICE"
          ? item.options.map((option) => (
              <div key={option.id} className="flex mt-2 dark">
                <Checkbox value={option.text as string}>{option.text}</Checkbox>
              </div>
            ))
          : null}
      </CheckboxGroup>
    </div>
  ));
  if (currSurvey) {
    return (
      <div className="text-white flex justify-center">
        <div className="w-[800px] mx-5 mt-5">
          <div className="bg-orange-500 h-20 rounded-lg pl-5 flex flex-col justify-center">
            <p>{currSurvey ? currSurvey.title : null}</p>
          </div>
          <div className="mt-5">
            <div>{questions}</div>
            {errors.length > 0 && (
              <div className="mt-5 text-red-500">
                <p>Proszę odpowiedzieć na wymagane pytania:</p>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="my-8 flex flex-row items-start">
            <Button
              onClick={handleSubmit}
              className="bg-orange-500 text-white"
              size="lg"
            >
              ZAPISZ ODPOWIEDZI
            </Button>
            {sendLoading ? (
              <Spinner className="ml-5" color="warning" size="lg" />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center text-white dark h-screen">
        <Spinner color="warning" label="Loading..." size="lg" />
      </div>
    );
  }
}

export default SurveyAnswerPage;
