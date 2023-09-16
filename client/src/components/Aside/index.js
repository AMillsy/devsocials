import "./Aside.css";
import userImage from "../../images/userImage.jpg";
import { Link } from "react-router-dom";
const Developers = ({ name, picture, id }) => {
  return (
    <Link to={`/profile/${id}`} className="devCon">
      <img src={picture ? picture : userImage} className="photo" />
      <h2>{name}</h2>
    </Link>
  );
};

export default Developers;
