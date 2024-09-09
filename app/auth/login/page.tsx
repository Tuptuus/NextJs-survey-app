"use client";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const LoginPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitLogin = async (e: any) => {
    e.preventDefault();
    const test = await login(data);
    if (test === "success") {
      router.push("/dashboard");
    } else {
      console.log("unexpected error");
    }
  };

  const loginGithub = (provider: any) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center h-screen text-white">
        <div
          onClick={() => loginGithub("github")}
          className=" bg-orange-500 w-96 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-orange-600 transition-all"
        >
          <span className="flex items-center text-xl">
            Login with <FaGithub className="ml-2 text-2xl" />
          </span>
        </div>
        <p className="mt-2">OR</p>
        <div className="flex flex-col">
          <form action="" onSubmit={submitLogin} className="flex flex-col">
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              placeholder="Email"
              className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96 "
              required
            />
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="outline-none bg-transparent border-2 m-2 p-2 rounded-lg w-96"
              required
            />
            <button
              // onClick={submitLogin}
              type="submit"
              className="bg-orange-500 m-2  h-10 text-xl rounded-lg"
            >
              LOGIN
            </button>
            <p className="flex flex-row items-end justify-end">
              You don&apos;t have account?{" "}
              <Link
                className="text-orange-500 pl-1 pr-2"
                href={"/auth/register"}
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
