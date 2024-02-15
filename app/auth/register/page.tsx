"use client";
import React, { useEffect, useState } from "react";
import { register } from "@/actions/register";

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
  };
  return (
    <div>
      <input
        onChange={(e) => handleInputsValue(e, "name")}
        type="text"
        placeholder="Name"
      />
      <input
        onChange={(e) => handleInputsValue(e, "email")}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => handleInputsValue(e, "pass")}
        type="text"
        placeholder="password"
      />
      <button onClick={sendData} className="bg-red-500">
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
