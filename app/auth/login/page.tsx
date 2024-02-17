"use client";
import React, { useState } from "react";
import { importLoginData } from "@/auth.config";

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "email") {
      setLoginEmail(e.target.value);
    } else if (type === "pass") {
      setLoginPassword(e.target.value);
    }
  };

  const sendData = () => {
    const data = { email: loginEmail, password: loginPassword };
    importLoginData(data);
  };
  return (
    <div>
      <input
        value={loginEmail}
        onChange={(e) => inputHandler(e, "email")}
        type="text"
        placeholder="email"
      />
      <input
        value={loginPassword}
        onChange={(e) => inputHandler(e, "pass")}
        type="text"
        placeholder="password"
      />
      <button onClick={sendData} className="bg-red-500">
        LOGIN
      </button>
    </div>
  );
};

export default LoginPage;
