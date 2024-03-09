"use client";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
        className="text-3xl pl-5 flex items-center"
      >
        <RiLogoutBoxLine className="cursor-pointer" />
      </button>
    </div>
  );
};

export default Logout;
