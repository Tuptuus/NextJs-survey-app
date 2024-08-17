"use client";
import { getSurveyByID } from "@/data/surveys";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

interface Survey {
  id: string | null;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
}

function SurveyResponse() {
  const [currSurvey, setCurrSurvey] = useState<Survey | null>();
  const params = useParams();

  useEffect(() => {
    const getSurvey = async () => {
      const survey = await getSurveyByID(params.id as string);
      setCurrSurvey(survey);
    };
    getSurvey();
  }, [params]);
  return (
    <div className="text-white flex justify-center">
      <div className="w-[800px] mx-5 mt-5">
        <div
          onClick={() => console.log(currSurvey)}
          className="bg-orange-500 h-20 rounded-lg pl-5 flex flex-col justify-center"
        >
          <p>Ankieta: {currSurvey ? currSurvey.title : null}</p>
        </div>
        <div className="mt-5 border rounded-lg p-5 flex flex-col items-center">
          <span>
            <CiCircleCheck className="text-5xl" />
          </span>
          <p>Twoje odpowiedzi zostały zapisane</p>
          <Link className="mt-2 underline" href={`/survey/${currSurvey?.id}`}>
            Prześlij kolejną odpowiedź
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SurveyResponse;
