import "./SkillList.css";

const SkillList = ({ skills, setTotalSkill }) => {
  const removeSkill = () => {};
  return (
    <ul>
      <li className="skill-item">
        <p className="skill-text">UX/UI</p>
        <button className="skill-btn">-</button>
      </li>
    </ul>
  );
};

export default SkillList;
