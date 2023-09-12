import React from "react";
import "./Navtabs.css";
import { Link } from "react-router-dom";

function NavTabs({ currentPage, handlePageChange }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Scripts</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}
export default NavTabs;
