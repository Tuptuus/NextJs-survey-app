"use client";
import React, { createContext, useState, useContext } from "react";

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
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Error context");
  }
  return context;
}
