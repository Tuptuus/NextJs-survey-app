import React from "react";
import CreateSurveyButton from "../components/CreateSurveyButton";
import SurveyBlock from "../components/SurveyBlock";
import ModalContextProvider from "../contexts/modalContext";

const DashboardPage = () => {
  return (
    <>
      <ModalContextProvider>
        <div className="max-w-[1500px] ms-auto me-auto text-white">
          <div className="flex py-7">
            <div className="text-2xl w-1/2  flex items-center">
              Twoje ankiety
            </div>
            <div className="w-1/2 flex justify-end ">
              <CreateSurveyButton />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <SurveyBlock />
            <SurveyBlock />
            <SurveyBlock />
            <SurveyBlock />
            <SurveyBlock />
          </div>
        </div>
      </ModalContextProvider>
    </>
  );
};

export default DashboardPage;
