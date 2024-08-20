"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js/auto";

function SurveyAnswers({ currSurvey }: any) {
  const { questions } = currSurvey;
  ChartJS.register(Tooltip, Legend, ArcElement);
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
      onClick={() => console.log(questions)}
      className="border rounded-xl p-6 my-8"
      key={item.id}
    >
      <div>
        <p>{item.title}</p>
      </div>
      <div className="flex justify-center">
        {item.type === "SINGLECHOICE" ? (
          <div>
            <Pie data={data} />
          </div>
        ) : null}
      </div>
    </div>
  ));

  return <div className="flex flex-col">{answers}</div>;
}

export default SurveyAnswers;
