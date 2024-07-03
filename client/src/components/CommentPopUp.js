import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENTS_QUERY } from "../utils/query";
import { CREATE_COMMENT } from "../utils/mutations";
import "./CommentPopUp.css";
import { Link } from "react-router-dom";
const CommentPopup = ({ isOpen, onRequestClose, postId, addCommentCount }) => {
  const { data, loading, error, refetch } = useQuery(GET_COMMENTS_QUERY, {
    variables: { id: postId },
  });
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const [createComment] = useMutation(CREATE_COMMENT);

  // useEffect(() => {
  //   if (isOpen) {
  //     refetch();
  //   }
  // }, [isOpen, refetch]);

  useEffect(
    function () {
      if (isOpen) {
        refetch();
        setComments(data?.getComments);
      }
    },
    [loading, isOpen]
  );

  if (loading) return "Loading...";
  if (error) return "Error with loading";

  const handleCommentSubmit = async () => {
    try {
      const { data } = await createComment({
        variables: {
          postId,
          message: commentText,
        },
      });

      setComments([...comments, { ...data.createComment }]);
      setCommentText("");
      addCommentCount();
    } catch (err) {
      setCommentError(err.message);
      setTimeout(function () {
        setCommentError("");
      }, 2000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comment Popup"
      className="comment-popup"
      ariaHideApp={false}
    >
      <h2 className="comment-popup-title">Comments</h2>
      <ul className="comment-list">
        {comments &&
          comments.map((comment) => (
            <li
              className="comment-item"
              style={{ color: "black" }}
              key={comment._id}
            >
              <span className="comment-text">
                <Link
                  className="comment-username-link"
                  to={`/profile/${comment.user._id}`}
                >
                  {comment.user.username}
                </Link>{" "}
                {comment.message}
              </span>
            </li>
          ))}
      </ul>
      <div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="comment-input"
        />
        <button onClick={handleCommentSubmit} className="add-comment-button">
          Add Comment
        </button>
        <p className="error-comment">{commentError}</p>
      </div>
      <button onClick={onRequestClose} className="close-button">
        Close
      </button>
    </Modal>
  );
};
export default CommentPopup;
