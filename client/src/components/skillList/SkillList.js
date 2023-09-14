import "./SkillList.css";

const SkillList = ({ skills, removeSkill }) => {
  return (
    <ul>
      {skills.map(function (skill) {
        return (
          <li className="skill-item">
            <p className="skill-text">{skill}</p>
            <button className="skill-btn" onClick={() => removeSkill(skill)}>
              -
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SkillList;
