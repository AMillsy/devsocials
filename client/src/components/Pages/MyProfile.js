import React from "react";
import "./MyProfile.css";
import NavTabs from "../NavTabs";
import MainFeed from "../MainFeed/MainFeed";
import { QUERY_ME } from "../../utils/query";
import { QUERY_USER } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export default function MyProfile() {
  const { userId } = useParams();

  const { loading, data, error } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { id: userId },
  });

  const userData = data?.me || data?.userProfile;

  if (loading) return <h2>Loading...</h2>;
  return (
    <article className="profile">
      <div className="card-container">
        <img
          className="round"
          src="https://www.bing.com/ck/a?!&&p=aa1f6fe22360ae83JmltdHM9MTY5NDQ3NjgwMCZpZ3VpZD0yNGIwZDgwNy1kNGQ0LTYwZDEtM2Y0MC1jYjcxZDVhMzYxNDgmaW5zaWQ9NTY1MA&ptn=3&hsh=3&fclid=24b0d807-d4d4-60d1-3f40-cb71d5a36148&u=a1L2ltYWdlcy9zZWFyY2g_cT1pY29uIHBlcnNvbiZGT1JNPUlRRlJCQSZpZD1EQUY0RDdDQTI0ODU1NDJCNzkzOUI3RjFCREY2RUEwQUJCODEwMEQ2&ntb=1"
          alt="user"
        />
        <h3 className="user-profile">
          {userData?.username ? userData.username : ""} {/**Username */}
        </h3>
        <h6 className="location-profile">
          {userData?.location ? userData.location : ""}
        </h6>
        <p className="skill-profile">
          {userData?.job ? userData.job : ""}
          <br />
        </p>
        <div className="buttons">
          <button className="primary">SCRIPTS</button>
          <button className="primary ghost">Follow</button>{" "}
          {/**Will say followed, if you follow them */}
        </div>
        {/**Will be able to edit your profile and add these */}
        <div className="skills">
          {/**Map through all the skills and put them on here */}
          <h6>Dev Skills</h6>
          <ul>
            <li>UI / UX</li>
            <li>Front End Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
