"use client";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

export let LoginData: any = "";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitLogin = () => {
    login(data);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen text-white">
      <div className=" bg-orange-500 w-96 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-orange-600 transition-all">
        <span className="flex items-center text-xl">
          Register with <FaGithub className="ml-2 text-2xl" />
        </span>
      </div>
      <p className="mt-2">OR</p>
      <div className="flex flex-col">
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          placeholder="email"
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
        />
        <input
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="text"
          placeholder="password"
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
        />
        <button
          onClick={submitLogin}
          className="bg-orange-500 m-2  h-10 text-xl rounded-lg"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
