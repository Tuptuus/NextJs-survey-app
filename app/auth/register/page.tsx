"use client";
import React, { useState } from "react";
import { register } from "@/actions/register";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { Spinner } from "@nextui-org/react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputsValue = (e: any, type: String) => {
    if (type == "name") {
      setName(e.target.value);
    } else if (type == "email") {
      setEmail(e.target.value);
    } else if (type == "pass") {
      setPass(e.target.value);
    }
  };

  const sendData = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = { name, email, pass };
    const loginData = { email, password: pass };
    const result = await register(data);
    console.log(result);
    if (result.success) {
      await login(loginData);
      router.push("/dashboard");
      setLoading(false);
      setName("");
      setEmail("");
      setPass("");
    } else if (result.message == "email in use") {
      setLoading(false);
      setError("Ten email jest już w użyciu");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setLoading(false);
      setError("Wystąpił nieznany błąd, spróbuj ponownie");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const loginGithub = (provider: any) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen text-white">
      <div
        onClick={() => loginGithub("github")}
        className=" bg-orange-500 w-96 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-orange-600 transition-all"
      >
        <span className="flex items-center text-xl">
          Register with <FaGithub className="ml-2 text-2xl" />
        </span>
      </div>
      <p className="mt-2">OR</p>
      <form action="" onSubmit={sendData} className="flex flex-col">
        <input
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
          onChange={(e) => handleInputsValue(e, "name")}
          type="text"
          placeholder="Name"
          value={name}
          required
        />
        <input
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
          onChange={(e) => handleInputsValue(e, "email")}
          type="email"
          placeholder="Email"
          value={email}
          required
        />
        <input
          className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
          onChange={(e) => handleInputsValue(e, "pass")}
          type="password"
          placeholder="Password"
          value={pass}
          minLength={6}
          required
        />
        <div className="flex justify-center">
          {error ? <span className="text-red-500">{error}</span> : null}
        </div>
        <button
          type="submit"
          className="bg-orange-500 m-2  h-10 text-xl rounded-lg hover:bg-orange-600 transition-all"
        >
          Register
          <span className="absolute ml-2">
            {loading ? <Spinner color="white" size="md" /> : null}
          </span>
        </button>
        <p className="flex justify-end">
          You have account?{" "}
          <Link className="text-orange-500 pl-1 pr-2" href={"/auth/login"}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
