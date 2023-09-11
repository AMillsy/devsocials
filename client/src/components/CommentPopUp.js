import React,{ useState, useEffect } from "react";
import Modal from "react-modal";
import {} from "@apollo/client";
import {} from "../utils/query"

const CommentPopup = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comment Popup"
    >
      <h2>Comments</h2>
      {/*  comment rendering */}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CommentPopup;