const db = require("../config/connection");
const { Post, User } = require("../models");
const postData = require("./postData.json");

const seed = async () => {
  db.once("open", async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    const posts = await Post.insertMany(postData);
    console.log("Data is seeded", posts);
    process.exit(0);
  });
};

seed();
