"use client";
import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDeleteModalContext } from "../contexts/deleteSurveyModalContext";
import { deleteSurveyByID } from "@/data/surveys";

interface DeleteSurveyModalProps {
  actionsOnID: string;
}

const DeleteSurveyModal: React.FC<DeleteSurveyModalProps> = ({
  actionsOnID,
}) => {
  const { showModal, setShowModal } = useDeleteModalContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeDeleteModal = () => {
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

  return (
    <div
      onClick={closeDeleteModal}
      className="bg-gray-900/90 top-0 left-0 absolute w-screen h-screen flex items-center justify-center text-white z-50"
    >
      <div
        onClick={preventCloseModal}
        ref={modalRef}
        className="border border-white rounded-lg bg-gray-950 p-5 w-[550px] loadAnimation"
      >
        <div className="flex">
          <p className="w-4/5 text-xl">Czy napewno chcesz usunąć ankietę?</p>
          <p className="w-1/5 flex justify-end text-2xl">
            <span className="cursor-pointer" onClick={closeDeleteModal}>
              <MdClose />
            </span>
          </p>
        </div>
        <div className="flex flex-col"></div>
        <div className="grid grid-cols-2 gap-5 my-2">
          <button
            onClick={closeDeleteModal}
            className="bg-orange-500 hover:bg-orange-600 transition-all w-full mt-3 rounded-lg text-xl h-10"
          >
            Anuluj
          </button>
          <button
            onClick={() => deleteSurveyByID(actionsOnID as string)}
            className="bg-orange-500 hover:bg-orange-600 transition-all w-full mt-3 rounded-lg text-xl h-10"
          >
            Usuń ankietę
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSurveyModal;
