"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type ModalContext = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialModalContext: ModalContext = {
  showModal: false,
  setShowModal: () => {},
};

export const ModalContext = createContext<ModalContext>(initialModalContext);

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useDeleteModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Error context");
  }
  return context;
}
