"use client";
import React, { useEffect, useState } from "react";
import OpenModalButton from "../components/OpenModalButton";
import SurveyBlock from "../components/SurveyBlock";
import ModalContextProvider from "../contexts/modalContext";
import { getSurveysByUserID } from "@/data/surveys";
import { useCurrentUser } from "@/hooks/currentUser";
import { db } from "@/lib/db";

interface Survey {
  id: string;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
}

const DashboardPage = () => {
  const user = useCurrentUser();
  const [surveysToDisplay, setSurveysToDisplay] = useState<Survey[]>([]);
  useEffect(() => {
    console.log("e");
    const fetchData = async () => {
      if (user?.id) {
        const data = await getSurveysByUserID(user.id);
        if (data) {
          setSurveysToDisplay(data);
        }
      }
    };
    fetchData();
  }, [user?.id]);
  return (
    <>
      <ModalContextProvider>
        <div className="max-w-[1500px] ms-auto me-auto text-white px-2">
          <div className="flex py-7">
            <div
              onClick={() => console.log(surveysToDisplay)}
              className="text-2xl w-1/2  flex items-center"
            >
              Twoje ankiety
            </div>
            <div className="w-1/2 flex justify-end ">
              <OpenModalButton />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {surveysToDisplay.map((item) => (
              <SurveyBlock
                key={item.id}
                title={item.title}
                desc={item.description}
                date={item.createdAt}
              />
            ))}
          </div>
        </div>
      </ModalContextProvider>
    </>
  );
};

export default DashboardPage;
