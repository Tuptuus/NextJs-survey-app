"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { getResponses, getSurveyByIDforAnswers } from "@/data/surveys";
import { useParams } from "next/navigation";

interface Response {
  id: string | null;
}

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

function SurveyAnswers() {
  const [currSurvey, setCurrSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Response[] | null>(null);
  const questions = currSurvey?.questions || [];
  const params = useParams();
  useEffect(() => {
    const getSurvey = async () => {
      const survey = await getSurveyByIDforAnswers(params.id as string);
      const responses = await getResponses(currSurvey?.id as string);
      setResponses(responses);
      setCurrSurvey(survey);
    };
    getSurvey();
  }, [params, currSurvey?.id]);
  ChartJS.register(Tooltip, Legend, ArcElement);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "right" as "right",
      },
    },
  };
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const answers = questions.map((item: any) => (
    <div
      // onClick={() => console.log(questions)}
      className="border rounded-xl p-6 my-8"
      key={item.id}
    >
      <div>
        <p>{item.title}</p>
      </div>
      <div className="flex justify-center">
        {item.type === "SHORTTEXT" ? (
          <div className="w-full" onClick={() => console.log(item)}>
            {item.answer.map((ans: any) => (
              <div className="border rounded-xl p-2 my-2" key={ans.id}>
                {ans.answerText}
              </div>
            ))}
          </div>
        ) : null}
        {item.type === "LONGTEXT" ? (
          <div className="w-full" onClick={() => console.log(item)}>
            {item.answer.map((ans: any) => (
              <div className="border rounded-xl p-2 my-2" key={ans.id}>
                {ans.answerText}
              </div>
            ))}
          </div>
        ) : null}
        {item.type === "SINGLECHOICE" ? (
          <div className="w-96 h-96">
            <Pie options={options} data={data} />
          </div>
        ) : null}
      </div>
    </div>
  ));

  return (
    <>
      <p>Liczba odpowiedzi: {responses ? responses.length : null}</p>
      <div className="flex flex-col">{answers}</div>
    </>
  );
}

export default SurveyAnswers;
