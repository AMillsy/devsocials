import React from "react";
import "./MyProfile.css";
import { QUERY_ME, QUERY_ME_FOLLOWING } from "../../utils/query";
import { QUERY_USER } from "../../utils/query";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProfileFeed from "../ProfileFeed";
import userImage from "../../images/userImage.jpg";
import { Link } from "react-router-dom";
import { FOLLOW_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function MyProfile() {
  const { userId } = useParams();
  const { loading, data, error } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { id: userId },
  });
  const { data: isFollowingData } = useQuery(QUERY_ME_FOLLOWING, {
    skip: !Auth.loggedIn() && userId,
  });

  let followed = false;
  if (Auth.loggedIn() && isFollowingData?.me?.following) {
    console.log(isFollowingData.me.following.includes(userId));
  }
  const [
    followUserMutation,
    { loading: followLoad, error: followError, data: followData },
  ] = useMutation(FOLLOW_USER);
  //Shouldnt show the follow button if its your profile

  const userData = data?.me || data?.userProfile;

  const followUser = async (userId) => {
    const follow = await followUserMutation({ variables: { userId } });
    console.log(followError);
    // window.location.reload();
  };

  const isUser = () => {
    if (!userId) {
      return (
        <>
          <Link to={"/new"}>
            <button className="primary">New Script</button>
          </Link>
          <Link to={"/settings"}>
            <button className="primary">Settings</button>
          </Link>
        </>
      );
    }

    return (
      <button onClick={() => followUser(userId)} className="primary ghost">
        Follow
      </button>
    );
  };

  if (error) return <h2>{error.message}</h2>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <article className="profile">
      <div className="card-container">
        <img
          className="picture-profile"
          src={userData?.image ? userData.image : userImage}
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
          {isUser()}
          {/**Will say followed, if you follow them */}
        </div>
        {/**Will be able to edit your profile and add these */}
        <div className="skills">
          {/**Map through all the skills and put them on here */}
          <h6>Dev Skills</h6>
          <ul className="profile-skill-list">
            {userData?.skills &&
              userData?.skills.map(function (skill) {
                return <li key={skill}>{skill}</li>;
              })}
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
