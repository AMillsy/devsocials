import "./ProfileFeed.css";
import { useParams } from "react-router-dom";
import { DELETE_POST } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const ProfileFeed = ({ title, description, image, postId }) => {
  const navigate = useNavigate();
  const [mutation, { error }] = useMutation(DELETE_POST);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { userId } = useParams();
  const isProfileOwner = !userId;

  const deletePost = async () => {
    try {
      await mutation({ variables: { postId } });
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const editPost = async () => {
    navigate(`/edit/${postId}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <div className="profile-post-con">
        <img className="profile-post" alt={title} src={image} />
        <div className="post-extra">
          <h3 className="profile-post-title">{title}</h3>
          <p className="profile-post-desc">{description}</p>
          {isProfileOwner ? (
            <div className="postBtns">
              <button className="postBtn postDelete" onClick={deletePost}>
                Delete
              </button>
              <button className="postBtn postEdit" onClick={editPost}>
                Edit
              </button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
              >
                <Alert
                  onClose={handleSnackbarClose}
                  severity="error"
                  color="error"
                  style={{ backgroundColor: "#121212" }}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileFeed;
