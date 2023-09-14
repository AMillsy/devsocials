import "./ProfileFeed.css";
const ProfileFeed = ({ title, description, image }) => {
  return (
    <>
      <div className="profile-post-con">
        <img className="profile-post" alt={title} src={image} />
        <div className="post-extra">
          <h3 className="profile-post-title">{title}</h3>
          <p className="profile-post-desc">{description}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileFeed;
