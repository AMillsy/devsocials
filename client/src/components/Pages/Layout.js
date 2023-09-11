import React from "react";
import NavTabs from "../NavTabs";
import Footer from "../Footer/Index";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <header className="myheader">
        <div className="logo">
          <span>RunDev</span>
          <img src="person-icon.png" alt="icon" />
        </div>
        <NavTabs />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
