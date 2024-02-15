import React from "react";
import Logout from "./Logout";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-gray-950 text-white border-b border-zinc-500 py-4">
      <div className="flex flex-row max-w-[1500px] ms-auto me-auto px-2">
        <div className="w-1/5">
          <Link href={"/dashboard"}>
            <span>LOGO</span>
          </Link>
        </div>
        <div className="w-4/5 flex justify-end">
          <div className="flex items-center">ZALOGOWANA OSOBA</div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
