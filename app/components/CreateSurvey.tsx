"use client";
import React from "react";
import { LuPlus } from "react-icons/lu";

const CreateSurvey = () => {
  return (
    <>
      <button className="border bg-orange-500 rounded-lg pr-1 pl-2 py-1 text-base font-bold hover:bg-orange-600 transition-all">
        <p className="flex items-center">
          Utwórz ankietę
          <span className="text-xl pl-1">
            <LuPlus />
          </span>
        </p>
      </button>
    </>
  );
};

export default CreateSurvey;
