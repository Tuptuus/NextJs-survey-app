"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";
import { getResponses, getSurveyByIDforAnswers } from "@/data/surveys";
import { useParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";

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
  const [currSurveyID, setCurrSurveyID] = useState<string | null>(null);
  const questions = currSurvey?.questions || [];
  const params = useParams();

  useEffect(() => {
    const getSurvey = async () => {
      const survey = await getSurveyByIDforAnswers(params.id as string);
      setCurrSurvey(survey);
    };
    getSurvey();
  }, [params]);

  useEffect(() => {
    setCurrSurveyID(currSurvey?.id ?? null);
  }, [currSurvey]);

  useEffect(() => {
    const getResponsesFunc = async () => {
      const responses = await getResponses(currSurveyID as string);
      setResponses(responses);
    };
    getResponsesFunc();
  }, [currSurveyID]);
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

  const generateColors = (numColors: number): string[] => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = i * (360 / numColors); // Równomierne rozmieszczenie barw
      const saturation = 70 + Math.random() * 20; // Saturowanie od 70% do 90%
      const lightness = 50 + Math.random() * 10; // Jasność od 50% do 60%
      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  };

  const answers = questions.map((item: any) => {
    const answerCounts: Record<string, number> = item.answer.reduce(
      (acc: any, answer: any) => {
        acc[answer.answerText] = (acc[answer.answerText] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const labels = item.options.map((opt: any) => opt.text);
    const data = labels.map((label: any) => answerCounts[label] || 0);
    const backgroundColor = generateColors(labels.length);
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
          hoverOffset: 4,
        },
      ],
    };
    return (
      <div
        onClick={() => console.log(item)}
        className="border rounded-xl p-6 my-8"
        key={item.id}
      >
        <div>
          <p>{item.title}</p>
        </div>
        <div className="flex justify-center">
          {item.type === "SHORTTEXT" ? (
            <div className="w-full">
              {item.answer.map((ans: any) => (
                <div className="border rounded-xl p-2 my-2" key={ans.id}>
                  {ans.answerText}
                </div>
              ))}
            </div>
          ) : null}
          {item.type === "LONGTEXT" ? (
            <div className="w-full">
              {item.answer.map((ans: any) => (
                <div className="border rounded-xl p-2 my-2" key={ans.id}>
                  {ans.answerText}
                </div>
              ))}
            </div>
          ) : null}
          {item.type === "SINGLECHOICE" ? (
            <div className="w-96 h-96">
              <Pie options={options} data={chartData} />
            </div>
          ) : null}
        </div>
      </div>
    );
  });

  if (responses) {
    return (
      <>
        {responses.length !== 0 ? (
          <>
            <p onClick={() => console.log(responses)}>
              Liczba odpowiedzi: {responses ? responses.length : null}
            </p>
            <div className="flex flex-col">{answers}</div>
          </>
        ) : (
          <div className="flex justify-center">
            <p className="text-2xl">
              Nie udzielono jeszcze odpowiedzi na tę ankietę
            </p>
          </div>
        )}
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center dark">
        <Spinner color="warning" label="Loading..." size="lg" />
      </div>
    );
  }
}

export default SurveyAnswers;
