import MainFeed from "../MainFeed";
import "./Homepage.css";
import { useQuery } from "@apollo/client";
import { QUERY_POST, QUERY_ME_HOMEPAGE_FOLLOW } from "../../utils/query";
import Developers from "../Aside";
import peopleicon from "../../images/peopleicon.jpg";
import { useEffect } from "react";
const mock = require("../Aside/mock.json");

const Homepage = () => {
  const { loading, data, error, refetch: postRefetch } = useQuery(QUERY_POST);
  const {
    loading: followLoad,
    data: followData,
    refetch,
  } = useQuery(QUERY_ME_HOMEPAGE_FOLLOW);

  useEffect(function () {
    refetch();
    postRefetch();
  }, []);

  if (error) return <h2>{error}</h2>;
  if (loading) return <p>Loading data</p>;

  return (
    <>
      <article className="main">
        <div className="devs">
          <div className="devs-title">
            <img src={peopleicon} className="devs-image" />
            <h3 className="devs">DEVELOPERS</h3>
          </div>
          {followData?.me?.following &&
          followData?.me?.following?.length !== 0 ? (
            followData.me?.following?.map(function ({ username, image, _id }) {
              return (
                <Developers
                  name={username}
                  picture={image}
                  key={_id}
                  id={_id}
                />
              );
            })
          ) : (
            <h3 className="follow-suggestion">
              Follow Developers to get easy access here!
            </h3>
          )}
        </div>
        <div className="feed">
          {data.posts.map(function ({
            _id,
            image,
            title,
            likeCount,
            description,
            commentCount,
            user,
          }) {
            return (
              <MainFeed
                key={_id}
                imgSrc={image}
                postId={_id}
                title={title}
                likes={likeCount}
                description={description}
                commentCount={commentCount}
                username={user.username}
                userId={user._id}
                userImage={user.image}
              />
            );
          })}
        </div>
      </article>
    </>
  );
};

export default Homepage;
