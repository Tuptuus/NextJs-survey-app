import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-700">
      <div className="text-white flex flex-col items-center">
        <p>Twój kreator ankiet</p>
        <Link href={"/dashboard"}>
          <p className="cursor-pointer hover:text-orange-500 transition-all">
            Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
