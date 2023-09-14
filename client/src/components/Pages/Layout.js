import React from "react";
import NavTabs from "../NavTabs";
import Footer from "../Footer/Index";
import { Outlet } from "react-router-dom";
import Logo from "../../images/logo.png";
import "./Layout.css";

function Layout({ children }) {
  const size = window.matchMedia("max-width: 500px");
  console.log(size);

  return (
    <>
      <header className="myheader">
        <div className="logo">
          <img src={Logo} alt="logo" className="logo"></img>
        </div>
        <NavTabs />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
