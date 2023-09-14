import MainFeed from "../MainFeed";
import "./Homepage.css";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../../utils/query";
import Developers from "../Aside";
import peopleicon from "../../images/peopleicon.jpg"
const mock = require("../Aside/mock.json")

const Homepage = () => {
  const { loading, data, error } = useQuery(QUERY_POST);

  if (error) return <h2>Error loading data</h2>;
  if (loading) return <p>Loading data</p>;
  return (
    <>
      <article className="main">
        <aside className="devs">DEVELOPERS</aside>
        <img src={peopleicon} className="devs-image" />
        <div className="devs">
          {mock.map(function ({ name,picture,id }) {
            return <Developers name={name} picture={picture} key={id} />;
          })}
        </div>
        <div className="feed">
          {data.posts.map(function ({
            _id,
            image,
            title,
            likes,
            description,
            commentCount,
          }) {
            return (
              <MainFeed
                key={_id}
                imgSrc={image}
                postId={_id}
                title={title}
                likes={likes}
                description={description}
                commentCount={commentCount}
              />
            );
          })}
        </div>
      </article>
    </>
  );
};

export default Homepage;
