const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const AWSS3Uploader = require("../config/awsS3config");
require("dotenv").config();
const s3Uploader = new AWSS3Uploader({
  destinationBucketName: "devsocials",
});
const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    posts: async () => {
      return Post.find({}).populate("comments.user");
    },
    users: async () => {
      return User.find({});
    },
    userProfile: async (parent, { _id }) => {
      return User.findById(_id).populate("posts");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError("You need to be logged in");
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
      const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);

      try {
        const newUpload = upload(parent, args);
        return newUpload;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
