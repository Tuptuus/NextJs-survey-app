"use client";
import React from "react";
import { MdOutlineFileOpen } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const SurveyBlock = () => {
  return (
    <>
      <div className="border p-5 rounded-xl">
        <div className="text-xl">tytuł</div>
        <div className="h-32 overflow-y-scroll customScrollbar">
          <p className="break-words pr-2">
            opissssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
            ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
          </p>
        </div>
        <div className="flex">
          <div className="w-1/2 flex items-center">
            <span className="pr-2">
              <FaRegCalendarAlt />
            </span>
            data
          </div>
          <div className="w-1/2 flex justify-end">
            <span className="cursor-pointer hover:text-orange-400 transition-all flex items-center">
              <span className="text-2xl">
                <MdOutlineFileOpen />
              </span>
              Otwórz ankiete
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyBlock;
