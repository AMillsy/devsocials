import React from "react";
import "./Navtabs.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/query";
import { useQuery } from "@apollo/client";
function NavTabs() {
  function isLoggedIn() {
    const loggedIn = Auth.loggedIn();

    if (loggedIn) {
      return <Link to={"/me"}>Username</Link>;
    }
    return <Link to={"/login"}>Login</Link>;
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Scripts</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>{isLoggedIn()}</li>
      </ul>
    </nav>
  );
}
export default NavTabs;
