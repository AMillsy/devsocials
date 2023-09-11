const db = require("../config/connection");
const { Post, User } = require("../models");
const postData = require("./postData.json");
const userData = require("./userData.json");
const { Schema } = require("mongoose");
const seed = async () => {
  db.once("open", async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    const createUsers = await User.insertMany(userData);

    for (const { title, description, image, likes, comments } of postData) {
      const userInt = Math.floor(Math.random() * (createUsers.length - 0) + 0);
      const userMessageInt = Math.floor(
        Math.random() * (createUsers.length - 0) + 0
      );
      const userPost = createUsers[userInt];
      const userMessage = createUsers[userMessageInt];

      const createPost = await Post.create({
        title: title,
        description: description,
        image: image,
        likes: likes,
        comments: [{ message: comments[0].message, user: userMessage._id }],
      });

      const updateUser = await User.updateOne(
        { _id: userPost._id },
        { $push: { posts: createPost._id } }
      );
      console.log(createPost);
    }

    console.log("Data is seeded");
    process.exit(0);
  });
};

seed();
