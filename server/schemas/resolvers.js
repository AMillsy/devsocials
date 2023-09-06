const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const AWSS3Uploader = require("../config/awsS3config");
require("dotenv").config();
const s3Uploader = new AWSS3Uploader({
  accessKeyId: process.env.AWS_ACESS_KEY,
  secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY,
  destinationBucketName: "devsocials",
});
const resolvers = {
  Query: {
    posts: async () => {
      return Post.find({});
    },
    users: async () => {
      return User.find({});
    },
    userProfile: async (parent, { _id }) => {
      return User.findById(_id).populate("posts");
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        if (user) {
          return user;
        }
        return AuthenticationError("Error creating user");
      } catch (error) {
        throw AuthenticationError("Error creating user");
      }
    },
    createPost: async (parent, { title, description, image, userId }) => {
      console.log(image);
      // const findUser = await User.findById(userId);

      // if (!findUser) return AuthenticationError("No user found to create post");

      // const post = await Post.create({
      //   title: title,
      //   description: description,
      //   image: image,
      // });
    },
    singleUpload: async (parent, args) => {
      console.log(args);
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
