import React from "react";
import CreateSurvey from "../components/CreateSurvey";
import SurveyBlock from "../components/SurveyBlock";

const DashboardPage = () => {
  return (
    <div className="max-w-[1500px] ms-auto me-auto text-white">
      <div className="flex  py-7">
        <div className="text-2xl w-1/2  flex items-center">Twoje ankiety</div>
        <div className="w-1/2 flex justify-end ">
          <CreateSurvey />
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
  );
};

export default DashboardPage;
