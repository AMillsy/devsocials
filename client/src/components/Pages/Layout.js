import React from "react";
import NavTabs from "../NavTabs";
import Footer from "../Footer/Index";

function Layout({ currentPage, handlePageChange, children }) {
  return (
    <div>
      <div className="myheader">
        <div className="logo">
        <span>RunDev</span>
          <img src="person-icon.png" alt="icon" />
        </div>
        <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default Layout;