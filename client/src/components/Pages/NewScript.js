import { useState } from "react";
import "./NewScript.css";
import ShowcaseFeed from "../ShowcaseFeed";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../utils/mutations";
const NewScript = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [mutation, { error }] = useMutation(CREATE_POST);
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
    console.log("Title:", formState.title);
    console.log("Description:", formState.description);
    console.log("File:", formState.file);

    // Reset form fields or perform other actions as needed
    await mutation({ variables: { ...formState } });

    window.location.assign("/me");
  };

  return (
    <div className="new-script-container">
      <div className="newFormCon">
        <h2 className="new-script-title">Create a New Script</h2>
        <form className="new-script-form" onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={onFormChange}
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={onFormChange}
            required
          />
          <label>Upload File:</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={onFileChange}
            required
          />
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
