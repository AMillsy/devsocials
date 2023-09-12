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
                <button alt="CommentPopup" onClick={openCommentPopup}>
                  <img className="extraImage" src={commentImg} />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="cardDesc">
          <p>{description}</p>
        </div>
      </div>
      {isCommentOpen()}
    </div>
  );
};

export default MainFeed;
