import { useState } from "react";
import "./NewScript.css";
import ShowcaseFeed from "../ShowcaseFeed";

const NewScript = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [image, setImage] = useState();

  const onFormChange = (e) => {
    const { value, name } = e.target;
    setFormState({ ...formState, [name]: value });

    console.log(name);
    if (name === "file") {
      const file = e.target.files[0];
      console.log(file);
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFormState({ ...formState, file: selectedFile });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log("Title:", formState.title);
    console.log("Description:", formState.description);
    console.log("File:", formState.file);
    // Reset form fields or perform other actions as needed
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
            onChange={onFormChange}
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
