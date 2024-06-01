import React, { useEffect, useState } from "react";
import OpenModalButton from "../components/OpenModalButton";
import SurveyBlock from "../components/SurveyBlock";
import ModalContextProvider from "../contexts/modalContext";
import { getSurveysByUserID } from "@/data/surveys";
import { auth } from "@/auth";

interface Survey {
  id: string;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
}

const getData = async () => {
  const session = await auth();
  const data = await getSurveysByUserID(session?.user?.id as string);
  return data;
};

const DashboardPage = async () => {
  const data = await getData();
  return (
    <>
      <ModalContextProvider>
        <div className="text-white">
          <div className="flex py-7">
            <div className="text-2xl w-1/2  flex items-center">
              Twoje ankiety
            </div>
            <div className="w-1/2 flex justify-end ">
              <OpenModalButton />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data?.map((item) => (
              <SurveyBlock
                key={item.id}
                title={item.title}
                desc={item.description}
                date={item.createdAt}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </ModalContextProvider>
    </>
  );
};

export default DashboardPage;
