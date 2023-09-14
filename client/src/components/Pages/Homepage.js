import MainFeed from "../MainFeed";
import "./Homepage.css";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../../utils/query";
import Developers from "../Aside";
const Homepage = () => {
  const { loading, data, error } = useQuery(QUERY_POST);

  if (error) return <h2>Error loading data</h2>;
  if (loading) return <p>Loading data</p>;
  return (
    <>
      <article className="main">
        <div className="devs">
          {data.posts.map(function ({ title }) {
            return <Developers title={title} key={title} />;
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
