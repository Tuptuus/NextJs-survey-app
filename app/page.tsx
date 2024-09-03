import Link from "next/link";
import React from "react";

const StartPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-950">
      <div className="text-white flex flex-col items-center">
        <p className="text-3xl p-2 font-bold">
          <span>Tup</span>
          <span className="nameGradient">Survey</span>
        </p>
        <p className="p-2">Aby uzyskać dostęp do aplikacji, zaloguj się</p>
        <Link className="w-full" href={"/auth/register"}>
          <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-lg text-xl py-1 m-2 w-full">
            Wypróbuj
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
