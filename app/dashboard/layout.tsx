import React from "react";
import Header from "../components/Header";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
