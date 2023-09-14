import "./SkillList.css";

const SkillList = ({ skills, removeSkill, addSkill }) => {
  return (
    <ul>
      {skills.map(function (skill) {
        return (
          <li className="skill-item">
            <p className="skill-text">UX/UI</p>
            <button className="skill-btn">-</button>
          </li>
        );
      })}
    </ul>
  );
};

export default SkillList;
