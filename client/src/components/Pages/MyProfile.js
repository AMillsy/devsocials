import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { QUERY_ME, QUERY_ME_FOLLOWING, QUERY_USER } from "../../utils/query";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import ProfileFeed from "../ProfileFeed";
import userImage from "../../images/userImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function MyProfile() {
  const { userId } = useParams();
  const [followed, setFollowed] = useState(false);
  const [followErrorMessage, setFollowError] = useState("");
  const { loading, data, error } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { id: userId },
  });
  const {
    data: isFollowingData,
    loading: meLoad,
    refetch,
  } = useQuery(QUERY_ME_FOLLOWING, {
    skip: !Auth.loggedIn(),
  });

  useEffect(
    function () {
      //Shouldnt show the follow button if its your profile
      refetch();
      if (isFollowingData?.follows) {
        if (userId === isFollowingData.follows._id)
          window.location.assign("/me");
      }
      if (Auth.loggedIn() && isFollowingData?.follows?.following) {
        setFollowed(isFollowingData.follows.following.includes(userId));
      }
    },
    [meLoad, userId]
  );

  const [followUserMutation, { error: followError }] = useMutation(FOLLOW_USER);
  const [unFollowUserMutation, { error: unFollowError }] =
    useMutation(UNFOLLOW_USER);

  const userData = data?.me || data?.userProfile;

  const followUser = async (userId) => {
    try {
      await followUserMutation({ variables: { userId } });

      setFollowed(true);
    } catch (error) {
      setFollowError(error.message);
      setTimeout(function () {
        setFollowError("");
      }, 2000);
    }
  };

  const unFollowUser = async (userId) => {
    await unFollowUserMutation({ variables: { userId } });
    setFollowed(false);
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

    if (followed) {
      return (
        <button onClick={() => unFollowUser(userId)} className="primary">
          Followed
        </button>
      );
    }
    return (
      <>
        <button onClick={() => followUser(userId)} className="primary ghost">
          Follow
        </button>
        <p className="error">{followErrorMessage}</p>
      </>
    );
  };

  if (error) return <h2>{error.message}</h2>;
  if (loading) return <h2>Loading...</h2>;

  const hasUserPosted = () => {
    if (userId) return;

    if (userData.posts.length !== 0) return;

    return <h2>Its looking blank here... Maybe posts some Scripts</h2>;
  };

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
        {userData?.posts.map(function ({ _id, image, title, description }) {
          return (
            <ProfileFeed
              key={_id}
              postId={_id}
              title={title}
              image={image}
              description={description}
            />
          );
        })}
        {hasUserPosted()}
      </div>
    </article>
  );
}
