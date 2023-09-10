import React from "react";
import "./NavTabs.css";

function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div className="myheader">
      {" "}
      <ul className="nav nav-tabs myul">
        <li className="nav-item">
          <a
            href="#Scripts"
            onClick={() => handlePageChange("Scripts")}
            className={
              currentPage === "Scripts" ? "nav-link active" : "nav-link"
            }
          >
            <h3>Scripts</h3>
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#LogIn"
            onClick={() => handlePageChange("LogIn")}
            className={
              currentPage === "LogIn" ? "nav-link active" : "nav-link"
            }
          >
            <h3>LogIn</h3>
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#MyProfile"
            onClick={() => handlePageChange("MyProfile")}
            className={
              currentPage === "MyProfile" ? "nav-link active" : "nav-link"
            }
          >
            <h3>MyProfile</h3>
          </a>
        </li>


      </ul>
    </div>
  );
}
export default NavTabs;
