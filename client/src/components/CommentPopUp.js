import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS_QUERY } from "../utils/query";
import { CREATE_COMMENT } from "../utils/mutations";

const CommentPopup = ({ isOpen, onRequestClose, postId }) => {
  const { loading, error, data, refetch } = useQuery(GET_COMMENTS_QUERY, {
    variables: { _id: postId },
    SKIP: !isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  console.log(error);
  if (loading) return "loading..";
  if (error) return "Error with loading";

  const Comments = data.Comments;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comment Popup"
    >
      <h2>Comments</h2>
      <ul>
        {Comments.map((Comment) => (
          <li key={Comment._id}>{Comment.message}</li>
        ))}
      </ul>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CommentPopup;
