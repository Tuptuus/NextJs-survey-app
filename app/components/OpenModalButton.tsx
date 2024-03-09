"use client";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { useModalContext } from "../contexts/modalContext";
import CreateSurveyModal from "./CreateSurveyModal";

const OpenModalButton = () => {
  const { showModal, setShowModal } = useModalContext();
  const openCreateSurveyModal = () => {
    setShowModal(true);
  };
  return (
    <>
      {showModal ? <CreateSurveyModal /> : null}
      <button
        className="border bg-orange-500 rounded-lg pr-1 pl-2 py-1 text-base font-bold hover:bg-orange-600 transition-all"
        onClick={openCreateSurveyModal}
      >
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

export default OpenModalButton;
