import "./ProfileFeed.css";
const ProfileFeed = () => {
  return (
    <>
      <div className="profile-post-con">
        <img
          className="profile-post"
          src="https://devsocials.s3.eu-west-2.amazonaws.com/testimage1.jpg_1694115914823"
        />
        <div className="post-extra">
          <h3 className="profile-post-title">Title</h3>
          <p className="profile-post-desc">
            This is the description of this post, its a really good post and
            very good read, please have a more indepth look at the post
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileFeed;
