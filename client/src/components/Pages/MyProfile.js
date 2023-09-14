import React from "react";
import "./MyProfile.css";
import { QUERY_ME } from "../../utils/query";
import { QUERY_USER } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProfileFeed from "../ProfileFeed";
import userImage from "../../images/userImage.jpg";

export default function MyProfile() {
  const { userId } = useParams();

  const { loading, data, error } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { id: userId },
  });

  const editBtn = () => {
    if (userId) return;

    return <button className="primary">Settings</button>;
  };

  const userData = data?.me || data?.userProfile;

  if (error) return <h2>{error.message}</h2>;
  if (loading) return <h2>Loading...</h2>;
  return (
    <article className="profile">
      <div className="card-container">
        <img className="picture-profile" src={userImage} alt="user" />
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
          <button className="primary">New Script</button>
          <button className="primary ghost">Follow</button>{" "}
          {/**Will say followed, if you follow them */}
          {editBtn()}
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
      <div className="profile-feed">
        {userData.posts.map(function ({ _id, image, title, description }) {
          return (
            <ProfileFeed
              key={_id}
              title={title}
              image={image}
              description={description}
            />
          );
        })}
      </div>
    </article>
  );
}
