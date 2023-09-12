import React from "react";
import "./MyProfile.css";
import NavTabs from "../NavTabs";
import MainFeed from "../MainFeed/MainFeed";

export default function MyProfile() {
  return (
    <article>
      <div class="card-container">
        <img
          class="round"
          src="https://www.bing.com/ck/a?!&&p=aa1f6fe22360ae83JmltdHM9MTY5NDQ3NjgwMCZpZ3VpZD0yNGIwZDgwNy1kNGQ0LTYwZDEtM2Y0MC1jYjcxZDVhMzYxNDgmaW5zaWQ9NTY1MA&ptn=3&hsh=3&fclid=24b0d807-d4d4-60d1-3f40-cb71d5a36148&u=a1L2ltYWdlcy9zZWFyY2g_cT1pY29uIHBlcnNvbiZGT1JNPUlRRlJCQSZpZD1EQUY0RDdDQTI0ODU1NDJCNzkzOUI3RjFCREY2RUEwQUJCODEwMEQ2&ntb=1"
          alt="user"
        />
        <h3>Dev Socials</h3>
        <h6>Birmingham</h6>
        <p>
          Full-stack developer
          <br />
        </p>
        <div class="buttons">
          <button class="primary">SCRIPTS</button>
          <button class="primary ghost">Follow</button>
        </div>
        <div class="skills">
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
