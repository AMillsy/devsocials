import MainFeed from "../MainFeed";
import "./Homepage.css";
import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../../utils/query";
const Homepage = () => {
  const { loading, data, error } = useQuery(QUERY_POST);

  return (
    <>
      <article className="main">
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
              imgSrc={image}
              postId={_id}
              title={title}
              likes={likes}
              description={description}
              commentCount={commentCount}
            />
          );
        })}
      </article>
    </>
  );
};

export default Homepage;
