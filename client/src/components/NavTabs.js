import React from "react";
import "./NavTabs.css";

function NavTabs({ currentPage, handlePageChange }) {
  return (
    <div>
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
            <h4>Scripts</h4>
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
            <h4>LogIn</h4>
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
            <h4>MyProfile</h4>
          </a>
        </li>


      </ul>
    </div>
  );
}
export default NavTabs;
