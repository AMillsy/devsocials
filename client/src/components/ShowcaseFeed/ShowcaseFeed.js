import "./ShowcaseFeed.css";

const ShowcaseFeed = () => {
  return (
    <div className="showCard">
      <div className="showSection showTop">Title</div>
      <img
        src="https://devhumor.com/content/uploads/images/June2022/learning_programming.jpg"
        className="showImg"
      />
      <div className="showSection showBottom">Description</div>
    </div>
  );
};

export default ShowcaseFeed;
