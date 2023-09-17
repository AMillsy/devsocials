import "./ShowcaseFeed.css";

const ShowcaseFeed = ({ title, description, image }) => {
  return (
    <div className="showCard">
      <div className="showSection showTop">{title}</div>
      <img src={image} alt={title} className="showImg" />
      <div className="showSection showBottom">{description}</div>
    </div>
  );
};

export default ShowcaseFeed;
