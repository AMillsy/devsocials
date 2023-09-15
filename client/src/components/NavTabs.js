import React, { useState } from "react";
import "./Navtabs.css";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_ME_USERNAME } from "../utils/query";
import { useQuery } from "@apollo/client";

function NavTabs() {
  const [username, setUsername] = useState("");

  const loggedIn = Auth.loggedIn();
  const { loading, data, error } = useQuery(QUERY_ME_USERNAME, {
    skip: !loggedIn || username !== "",
  });

  function isLoggedIn() {
    if (loading) return;
    if (error)
      return (
        <Link className="nav-item" to={"/me"}>
          Profile
        </Link>
      );
    if (username) {
      return (
        <Link className="nav-item" to={"/me"}>
          {username}
        </Link>
      );
    } else if (data?.me?.username) {
      setUsername(data?.me?.username);
      return (
        <Link className="nav-item" to={"/me"}>
          {username}
        </Link>
      );
    }
    return (
      <Link className="nav-item" to={"/login"}>
        Login / Sign Up
      </Link>
    );
  }
  function logout() {
    //Log the user out and return them to the homepage
    Auth.logout();
  }
  function addLogout() {
    if (loggedIn && (data?.me?.username || username))
      return (
        <li>
          <Link onClick={() => logout()} className="logout-btn nav-item">
            Logout
          </Link>
        </li>
      );
  }
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link className="nav-item" to={"/"}>
            Scripts
          </Link>
        </li>
        <li>{isLoggedIn()}</li>
        {addLogout()}
      </ul>
    </nav>
  );
}
export default NavTabs;
