import React from "react";
import Header from "../components/Header";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen">
      <Header />
      <div className="max-w-[1500px] ms-auto me-auto px-2">{children}</div>
    </div>
  );
}

export default Layout;
