import "./MainFeed.css";
import React, { useState } from "react";
import heart from "../../images/heart.png";
import commentImg from "../../images/comment.png";
import CommentPopup from "../CommentPopUp";
import { Link } from "react-router-dom";
import basicUserImage from "../../images/userImage.jpg";

const MainFeed = ({
  imgSrc,
  postId,
  title,
  likes,
  description,
  username,
  userId,
  userImage,
}) => {
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);

  const openCommentPopup = () => {
    setIsCommentPopupOpen(true);
  };

  const closeCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };

  const isCommentOpen = () => {
    if (isCommentPopupOpen) {
      return (
        <CommentPopup
          isOpen={isCommentPopupOpen}
          onRequestClose={closeCommentPopup}
          postId={postId}
        />
      );
    }
    return;
  };

  return (
    <>
      <div className="card">
        <div className="cardSections cardTop">
          <Link className="userLink-card" to={`/profile/${userId}`}>
            <img
              src={userImage ? userImage : basicUserImage}
              className="cardUserImage"
            />
            <p>{username}</p>
          </Link>
          <h3 className="cardTitle">{title}</h3>
        </div>
        <div className="imgCon-card">
          <img src={imgSrc} className="imgCard" />
        </div>
        <div className="cardSections cardBottom"></div>
      </div>
      <div className="cardSpacer"></div>
    </>
  );
};

export default MainFeed;
