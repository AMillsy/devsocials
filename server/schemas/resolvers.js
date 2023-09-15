const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
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
      return Post.find({}).populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      });
    },
    users: async () => {
      return User.find({});
    },
    getComments: async (parent, { _id }) => {
      const post = await Post.findById(_id).populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      });

      return post.comments;
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
        console.log(args);
        const user = await User.create(args);

        if (user) {
          const token = signToken(user);
          return { token, user };
        }
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    loginUser: async (parent, { username, password }) => {
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
    updateUser: async (
      parent,
      { username, file, location, job, skills },
      context
    ) => {
      console.log(file);
      if (!context.user)
        throw new AuthenticationError("Must be logged in to update settings");

      const updates = {};

      if (file) {
        const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);

        const newPicture = await upload(parent, { file });

        updates.image = newPicture.url;
      }
      if (username) updates.username = username;
      if (location) updates.location = location;
      if (skills) updates.skills = skills;
      if (job) updates.job = job;
      console.log(updates);
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        updates,
        { new: true }
      );
      return updateUser;
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
        throw error;
      }
    },
    multiUpload: async (parent, args) => {
      const upload = s3Uploader.multiUploadResolver.bind(s3Uploader);

      try {
        const newUploads = await upload(parent, args);
        return newUploads;
      } catch (error) {
        throw error;
      }
    },
    createComment: async (parent, { postID, message, userID }, context) => {
      // if (!context.user)
      //   throw new AuthenticationError("Must be logged in to make a comment");
      const newComment = await Comment.create({ message, user: userID });
      const updatePost = await Post.findOneAndUpdate(
        { _id: postID },
        { $push: { comments: newComment } },
        { new: true }
      );

      return newComment;
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
