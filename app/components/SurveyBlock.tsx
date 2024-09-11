"use client";
import React from "react";
import { MdOutlineFileOpen } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface SurveyBlockProps {
  key: string | null;
  title: string | null;
  desc: string | null;
  date: string | null;
  id: string | null;
}

const SurveyBlock: React.FC<SurveyBlockProps> = ({
  key,
  title,
  desc,
  date,
  id,
}) => {
  const router = useRouter();
  return (
    <>
      <div key={key} className="border p-5 rounded-xl">
        <div className="text-xl h-16">{title}</div>
        <div className="h-32 overflow-y-scroll customScrollbar">
          <p className="break-words pr-2">{desc}</p>
        </div>
        <div className="flex pt-3">
          <div className="w-1/2 flex items-center">
            <span className="pr-2">
              <FaRegCalendarAlt />
            </span>
            {date}
          </div>
          <div className="w-1/2 flex justify-end">
            <span
              onClick={() => {
                router.push(`/dashboard/survey/${id}`);
              }}
              className="cursor-pointer hover:text-orange-400 transition-all flex items-center"
            >
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
