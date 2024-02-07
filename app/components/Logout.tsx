"use client";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const logout = () => {
    console.log("logout");
    router.push("/");
  };

  return (
    <div>
      <p onClick={logout} className="cursor-pointer text-3xl pl-5">
        <RiLogoutBoxLine />
      </p>
    </div>
  );
};

export default Logout;
