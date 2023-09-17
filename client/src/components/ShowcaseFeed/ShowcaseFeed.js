import "./ShowcaseFeed.css";

const ShowcaseFeed = ({ title, description, image }) => {
  const isUsingFeed = () => {
    if (title) return title;

    return "Showcase Feed";
  };

  return (
    <div className="showCard">
      <div className="showSection showTop">{isUsingFeed()}</div>
      <img src={image} alt={title} className="showImg" />

      <div className="showSection showBottom">{description}</div>
    </div>
  );
};

export default ShowcaseFeed;
