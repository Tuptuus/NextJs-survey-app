"use client";
import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useCreateModalContext } from "../contexts/createSurveyModalContext";
import { createSurvey } from "@/actions/createSurvey";

const CreateSurveyModal = (props: any) => {
  const { user } = props;
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const { setShowModal } = useCreateModalContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeSurveyModal = () => {
    const modal = modalRef.current;
    modal?.classList.add("unloadAnimation");
    if (modal) {
      modal.onanimationend = () => {
        modal?.classList.remove("unloadAnimation");
        setShowModal(false);
      };
    }
  };

  const preventCloseModal = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  const createSurveyFunction = () => {
    const currDate = new Date().toLocaleDateString();
    if (data.title == "" || data.description == "") {
      setError("Wpisz tytuł oraz opis ankiety");
      setTimeout(() => {
        setError("");
      }, 2500);
    } else {
      createSurvey({
        ...data,
        surveyToUserID: user?.id,
        createdAt: currDate,
      });
      closeSurveyModal();
    }
  };

  return (
    <div
      onClick={closeSurveyModal}
      className="bg-gray-900/90 top-0 left-0 absolute w-screen h-screen flex items-center justify-center text-white"
    >
      <div
        onClick={preventCloseModal}
        ref={modalRef}
        className="border border-white rounded-lg bg-gray-950 p-5 w-[450px] loadAnimation"
      >
        <div className="flex">
          <p className="w-1/2 text-xl">Nowa ankieta</p>
          <p className="w-1/2 flex justify-end text-2xl">
            <span className="cursor-pointer" onClick={closeSurveyModal}>
              <MdClose />
            </span>
          </p>
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Tytuł ankiety"
            className="bg-transparent border border-white rounded-md p-4 mt-6"
            maxLength={70}
          />
          <input
            type="text"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Opis ankiety"
            className="bg-transparent border border-white rounded-md p-4 mt-6"
          />
        </div>
        <div className="flex items-center justify-center mt-3">
          <span className="text-red-500 ">{error}</span>
        </div>
        <button
          onClick={() => createSurveyFunction()}
          className="bg-orange-500 hover:bg-orange-600 transition-all w-full mt-3 rounded-lg text-xl h-10"
        >
          Utwórz ankietę
        </button>
      </div>
    </div>
  );
};

export default CreateSurveyModal;
