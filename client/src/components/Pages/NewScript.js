import { useState }from "react";
import './NewScript.css';


const NewScript = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    file: null,
  });


const onFormChange = (e) => {
  const { value, name } = e.target;
  setFormState({ ...formState, [name]: value });
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
        onChange={handleFileUpload}
        required
      />
      <button className="new-script-submit" type="submit">
        Submit
      </button>
    </form>
  </div>
);
}

export default NewScript;


