import React from "react";
import Logout from "./Logout";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";
import defaultAvatar from "../../assets/defaultAvatar.png";

const Header = async () => {
  const session = await auth();
  return (
    <div className="bg-gray-950 text-white border-b border-zinc-500 py-4">
      <div className="flex flex-row max-w-[1500px] ms-auto me-auto px-2">
        <div className="w-1/5 flex items-center">
          <Link href={"/dashboard"}>
            <span>LOGO</span>
          </Link>
        </div>
        <div className="w-4/5 flex justify-end items-center">
          <div className="w-10 h-10 mr-5 rounded-full flex justify-center items-center">
            {session?.user?.image ? (
              <Image
                width={100}
                height={100}
                className="rounded-full"
                src={session.user.image}
                alt="avatar"
              />
            ) : (
              <Image
                height={100}
                width={100}
                src={defaultAvatar}
                className="rounded-full"
                alt="avatar"
              />
            )}
          </div>
          <div className="flex items-center">
            {session?.user ? session.user.name : null}
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Header;
