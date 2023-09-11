import "./MainFeed.css";

const MainFeed = ({ imgSrc }) => {
  return (
    <div className="middle">
      <div className="card">
        <h2>Title</h2>
        <div className="cardContainer">
          <div className="cardImageContainer">
            <img src={imgSrc}></img>
          </div>
          <div className="cardInfo">
            <ul>
              <li>Likes:</li>
              <li>Comments:</li>
            </ul>
          </div>
        </div>
        <div className="cardDesc">
          <p>
            Start your day with a hearty helping of code! Let's explore the
            delicious world of programming together. #CodeBreakfast #DevHumor
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
