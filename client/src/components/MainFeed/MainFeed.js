import "./MainFeed.css";
import React, { useState } from "react";
import heart from "../../images/heart.png";
import commentImg from "../../images/comment.png";
import CommentPopup from "../CommentPopUp";

const MainFeed = ({ imgSrc, postId, title, likes, description }) => {
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);

  const openCommentPopup = () => {
    setIsCommentPopupOpen(true);
  };

  const closeCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };

  return (
    <div className="middle">
      <div className="card">
        <h2>{title}</h2>
        <div className="cardContainer">
          <div className="cardImageContainer">
            <img className="mainImage" src={imgSrc} alt=""></img>
          </div>
          <div className="cardInfo">
            <ul>
              <li>
                <img className="extraImage" src={heart} alt=""></img>
                <p>{likes}</p>
              </li>
              <li>
                <img
                  className="extraImage"
                  src={commentImg}
                  alt=""
                  onClick={openCommentPopup}
                ></img>
              </li>
            </ul>
          </div>
        </div>
        <div className="cardDesc">
          <p>{description}</p>
        </div>
      </div>
      <CommentPopup
        isOpen={isCommentPopupOpen}
        onRequestClose={closeCommentPopup}
        postId={postId}
      />
    </div>
  );
};

export default MainFeed;
