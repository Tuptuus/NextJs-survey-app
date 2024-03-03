import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut } from "@/auth";

const Logout = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="text-3xl pl-5">
          <RiLogoutBoxLine className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default Logout;
