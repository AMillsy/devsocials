import React,{ useState, useEffect } from "react";
import Modal from "react-modal";
import { useMutation, useQuery } from "@apollo/client";
import {GET_COMMENTS_QUERY,} from "../utils/query"
import { CREATE_COMMENT } from "../utils/mutations";

const CommentPopup = ({ isOpen, onRequestClose,postId }) => {
  const {loading, error, data, refetch } = useQuery(GET_COMMENTS_QUERY, {
    variables: { postId:postId },
    skip: !isOpen,
  });

  const [commentText, setCommentText] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT);

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  if (loading) return "Loading..."; 
  if (error) return 'Error with loading';

  const comments = data && data.comments ? data.comments : [];

  
  const handleCommentSubmit = async () => {
    try {
      await createComment({
        variables: {
          postId:postId,
          message: commentText,
        },
      });
      setCommentText("");
      refetch();
    } catch (err) {
      console.error("Error adding comment", err);
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comment Popup"
    >
      <h2>Comments</h2>
<ul>
  {comments.map((comments) => (
    <li key={Comment._id}>{Comment.message}</li>
  ))}
</ul>
<div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
      </div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CommentPopup;