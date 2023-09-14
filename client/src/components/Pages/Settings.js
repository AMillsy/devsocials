import { useEffect, useState } from "react";
import "./Settings.css";
import SkillList from "../skillList";
import { QUERY_ME_SKILLS } from "../../utils/query";
import { useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
const Settings = () => {
  const [formState, setFormState] = useState({
    username: "",
    location: "",
    job: "",
    file: null,
  });
  const [skills, setSkills] = useState([]);
  const { data, loading } = useQuery(QUERY_ME_SKILLS);
  const [updateUser, { error }] = useMutation(UPDATE_USER);
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
    const input = e.target.previousElementSibling;
    const skill = input.value;
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
    console.log(skills);
    if (loading) return;
    if (!skills) return;
    return <SkillList skills={skills} removeSkill={removeSkill} />;
  };

  const onFileChange = (e) => {
    setFormState({ ...formState, file: e.target.files[0] });
  };
  //Adds data to my formState
  const onFormChange = (e) => {
    const { value, name } = e.target;

    setFormState({ ...formState, [name]: value });
    console.log(formState);
  };
  //Submits the data to the server
  const handleFormSubmit = (e) => {
    e.preventDefault();

    updateUser({ variables: { ...formState, skills: skills } });

    window.location.assign("/me");
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
          <input name="job" placeholder="Web developer"></input>
          <label>Skills</label>
          <div className="skills-submit">
            <p className="skills-warning">
              Click the <b>+</b> to add new skills
            </p>
            <input type="text" placeholder="skill" id="skillInput"></input>
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
