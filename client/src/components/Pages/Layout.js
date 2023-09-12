import React from "react";
import NavTabs from "../NavTabs";
import Footer from "../Footer/Index";
import { Outlet } from "react-router-dom";
import Logo from "../../images/logo.png";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <header className="myheader">
        <div className="logo">
          <img src={Logo} alt="logo" class="logo"></img>
        </div>
        <NavTabs />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
