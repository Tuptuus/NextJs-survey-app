"use client";
import React, { useRef } from "react";
import { MdClose } from "react-icons/md";
import { useModalContext } from "../contexts/modalContext";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/currentUser";

const CreateSurveyModal = () => {
  const user = useCurrentUser();
  const { setShowModal } = useModalContext();
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
            placeholder="Tytuł ankiety"
            className="bg-transparent border border-white rounded-md p-4 mt-6"
          />
          <input
            type="text"
            placeholder="Opis ankiety"
            className="bg-transparent border border-white rounded-md p-4 mt-6"
          />
        </div>
        <button
          onClick={() => console.log(user)}
          className="bg-orange-500 hover:bg-orange-600 transition-all w-full mt-6 rounded-lg text-xl h-10"
        >
          Utwórz ankietę
        </button>
      </div>
    </div>
  );
};

export default CreateSurveyModal;
