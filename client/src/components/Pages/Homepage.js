import MainFeed from "../MainFeed";
import "./Homepage.css";
const Homepage = () => {
  return (
    <>
      <article className="main">
        <MainFeed
          imgSrc={
            "https://devsocials.s3.eu-west-2.amazonaws.com/testimage2.png_1694115963401"
          }
        />
        <MainFeed
          imgSrc={
            "https://devsocials.s3.eu-west-2.amazonaws.com/testimage3.jpg_1694115968472"
          }
        />
      </article>
    </>
  );
};

export default Homepage;
