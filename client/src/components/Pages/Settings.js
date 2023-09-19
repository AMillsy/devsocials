import { useEffect, useState } from "react";
import "./Settings.css";
import SkillList from "../skillList";
import { QUERY_ME_SKILLS } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const [formState, setFormState] = useState({
    username: "",
    location: "",
    job: "",
    file: null,
  });
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const { data, loading } = useQuery(QUERY_ME_SKILLS);
  const [updateUserMutation, { error }] = useMutation(UPDATE_USER);
  useEffect(
    function () {
      setSkills(data?.me?.skills);
    },
    [data]
  );
  //Removes a skill locally from the list
  const removeSkill = (skill) => {
    const removedSkill = skills.filter((value) => value !== skill);

    setSkills(removedSkill);
  };
  //Adds a skill locally onto the list
  const addSkill = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const input = e.target.previousElementSibling;
    const skill = input.value;
    input.value = "";
    if (!skill) return;
    if (!skills) {
      setSkills([skill]);
      return;
    }
    if (skills.includes(skill)) return;
    setSkills([...skills, skill]);
  };
  //Shows the skills on screen
  const showSkills = () => {
    if (loading) return;
    if (!skills) return;
    return <SkillList skills={skills} removeSkill={removeSkill} />;
  };

  const onFileChange = (e) => {
    const {
      validity,
      files: [file],
    } = e.target;
    if (!validity.valid) return;
    setFormState({ ...formState, file: file });
  };
  //Adds data to my formState
  const onFormChange = (e) => {
    const { value, name } = e.target;

    setFormState({ ...formState, [name]: value });
  };
  //Submits the data to the server
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserMutation({
        variables: { ...formState, skills: skills },
      });
      navigate("/me");
      window.location.reload();
    } catch (error) {}
  };
  return (
    <>
      <div className="settings-title-con">
        <h2 className="settings-title">Settings</h2>
      </div>
      <div className="settings-container">
        <form className="settings-form" onSubmit={handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={onFormChange}
          ></input>
          <label>Profile Image:</label>
          <input type="file" name="file" onChange={onFileChange} />
          <label>Location:</label>
          <input
            type="text"
            id="location"
            placeholder="London"
            name="location"
            onChange={onFormChange}
          ></input>
          <label>Job or Hobby:</label>
          <input
            name="job"
            placeholder="Web developer"
            onChange={onFormChange}
          ></input>
          <label>Skills</label>
          <div className="skills-submit">
            <p className="skills-warning">
              Click the <b>+</b> to add new skills
            </p>
            <input
              type="text"
              placeholder="skill"
              id="skillInput"
              onSubmit={addSkill}
            ></input>
            <button className="settings-submit skills-btn" onClick={addSkill}>
              +
            </button>
          </div>
          {showSkills()}
          <button className="settings-submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Settings;
