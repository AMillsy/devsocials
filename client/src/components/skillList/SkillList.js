import "./SkillList.css";

const SkillList = ({ skills, removeSkill }) => {
  return (
    <ul className="skill-list">
      {skills.map(function (skill) {
        return (
          <li key={skill} className="skill-item">
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
