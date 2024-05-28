import React from "react";
import QuestionBlock from "./QuestionBlock";
import SurveyActions from "./SurveyActions";

interface Question {
  id: string | null;
  surveyId: string | null;
  text: string | null;
  type: string | null;
}

interface Survey {
  id: string | null;
  surveyToUserID: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  questions: Question[];
}

const SurveyQuestions: React.FC<Survey> = (item) => {
  console.log(item);
  return (
    <div>
      <SurveyActions actionsOnID={item.id as string} />
      <div className="flex flex-col">
        {item.questions.map((question) => (
          <QuestionBlock key={question.id} questionTitle={question.text} />
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestions;
