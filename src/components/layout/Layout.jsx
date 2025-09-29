// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Navbar/Sidebar";
import Navbar from "../Navbar/Navbar";
import useListenMessages from "../hooks/useListenMessages";

const Layout = () => {
  useListenMessages();
  return (
    <div className="">
      <div className="">
        <Sidebar />

        <div className=" md:ml-auto px-4 lg:w-[calc(100%-15rem)]">
          <Navbar />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
