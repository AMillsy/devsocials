import "./MainFeed.css";
import React, { useState } from "react";
import heart from "../../images/heart.png";
import commentImg from "../../images/comment.png";
import CommentPopup from "../CommentPopUp";
import { Link } from "react-router-dom";
import basicUserImage from "../../images/userImage.jpg";
import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../../utils/mutations";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const MainFeed = ({
  imgSrc,
  postId,
  title,
  likes,
  description,
  username,
  userId,
  userImage,
  commentCount,
}) => {
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [commentAmount, setCommentAmount] = useState(commentCount);
  const [likesAmount, setLikesAmount] = useState(likes);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mutation, { error }] = useMutation(ADD_LIKE);
  const openCommentPopup = () => {
    setIsCommentPopupOpen(true);
  };

  const closeCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };

  const addCommentCount = () => {
    const newTotal = commentAmount + 1;
    setCommentAmount(newTotal);
  };

  const addLike = async () => {
    try {
      await mutation({ variables: { postId } });
      if (likes === likesAmount) {
        const likeTotal = likesAmount + 1;
        setLikesAmount(likeTotal);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isCommentOpen = () => {
    if (isCommentPopupOpen) {
      return (
        <CommentPopup
          isOpen={isCommentPopupOpen}
          onRequestClose={closeCommentPopup}
          postId={postId}
          addCommentCount={addCommentCount}
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
        <div className="cardSections cardBottom">
          <p className="cardDesc">{description}</p>
          <div className="cardLinks">
            <button onClick={openCommentPopup}>
              <img
                className="cardBottomImage"
                src={commentImg}
                alt="comment Button"
              />
              <p className="buttonNum">{commentAmount ? commentAmount : ""}</p>
            </button>
            <button onClick={addLike}>
              <img className="cardBottomImage" src={heart} alt="Like Btn" />
              <p className="buttonNum likes">
                {likesAmount ? likesAmount : ""}
              </p>
            </button>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          color="error"
          style={{ backgroundColor: "black" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <div>{isCommentOpen()}</div>
      <div className="cardSpacer"></div>
    </>
  );
};

export default MainFeed;
