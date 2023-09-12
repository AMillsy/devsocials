const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const AWSS3Uploader = require("../config/awsS3config");
const { signToken } = require("../utils/auth");
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
    getComments: async (parent, { _id }) => {
      return Post.findById(_id).populate("comments.user");
    },
    userProfile: async (parent, { _id }) => {
      return User.findOne({ _id }).populate("posts");
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
        throw new AuthenticationError("Error creating user");
      } catch (error) {
        throw new AuthenticationError("Error creating user");
      }
    },
    loginUser: async (parent, { username, password }) => {
      console.log(username, password);
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    createPost: async (parent, { title, description, image }, context) => {
      if (!context.user)
        throw new AuthenticationError("Must be logged in to create a post ");

      const findUser = await User.findOne({ _id: context.user._id });

      if (!findUser)
        throw new AuthenticationError("No user found to create post");

      const post = await Post.create({
        title: title,
        description: description,
        image: image,
      });
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
    multiUpload: async (parent, args) => {
      console.log(args);
      const upload = s3Uploader.multiUploadResolver.bind(s3Uploader);

      try {
        const newUploads = await upload(parent, args);
        return newUploads;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
