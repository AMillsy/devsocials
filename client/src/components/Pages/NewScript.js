import { useEffect, useState } from "react";
import "./NewScript.css";
import ShowcaseFeed from "../ShowcaseFeed";
import { useMutation } from "@apollo/client";
import { CREATE_POST, UPDATE_POST } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../utils/query";
const NewScript = () => {
  const { postId } = useParams();

  const {
    loading,
    data,
    error: postError,
  } = useQuery(QUERY_SINGLE_POST, { variables: { postId } });

  useEffect(
    function () {
      if (data?.findPost) {
        setFormState({
          title: data.findPost?.title,
          description: data.findPost?.description,
        });

        setImage(data.findPost?.image);
      }
    },
    [loading]
  );

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [mutation, { error }] = useMutation(postId ? UPDATE_POST : CREATE_POST);
  const [image, setImage] = useState();

  const onFormChange = (e) => {
    const { value, name } = e.target;
    setFormState({ ...formState, [name]: value });

    if (name === "file") {
    }
  };

  const onFileChange = ({ target }) => {
    const {
      validity,
      files: [file],
    } = target;
    if (!validity.valid) return;
    setFormState({ ...formState, file: file });
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)

    // Reset form fields or perform other actions as needed
    if (postId) {
      await mutation({ variables: { ...formState, postId: postId } });
    } else {
      await mutation({ variables: { ...formState } });
    }

    window.location.assign("/me");
  };

  if (loading) return <h3>Loading data</h3>;
  if (error) return <h3>{error.message}</h3>;

  return (
    <div className="new-script-container">
      <div className="newFormCon">
        <h2 className="new-script-title">
          {postId ? "Edit Post" : "Create a New Script"}
        </h2>
        <form className="new-script-form" onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={onFormChange}
            value={formState.title}
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={onFormChange}
            value={formState.description}
            required
          />
          <label>Upload File:</label>
          {postId ? (
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onFileChange}
            />
          ) : (
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={onFileChange}
              required
            />
          )}

          <button className="new-script-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
      <ShowcaseFeed
        title={formState.title}
        description={formState.description}
        image={image}
      />
    </div>
  );
};

export default NewScript;
