"use client";
import React, { useEffect, useState } from "react";
import { register } from "@/actions/register";
import { FaGithub } from "react-icons/fa";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleInputsValue = (e: any, type: String) => {
    if (type == "name") {
      setName(e.target.value);
    } else if (type == "email") {
      setEmail(e.target.value);
    } else if (type == "pass") {
      setPass(e.target.value);
    }
  };

  const sendData = () => {
    const data = { name, email, pass };
    register(data);
    setName("");
    setEmail("");
    setPass("");
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
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
          onChange={(e) => handleInputsValue(e, "name")}
          type="text"
          placeholder="Name"
          value={name}
        />
        <input
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
          onChange={(e) => handleInputsValue(e, "email")}
          type="text"
          placeholder="Email"
          value={email}
        />
        <input
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
          onChange={(e) => handleInputsValue(e, "pass")}
          type="text"
          placeholder="Password"
          value={pass}
        />
        <button
          onClick={sendData}
          className="bg-orange-500 m-2  h-10 text-xl rounded-lg hover:bg-orange-600 transition-all"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
