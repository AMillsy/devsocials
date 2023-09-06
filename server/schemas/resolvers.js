const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const resolvers = {
  Query: {
    posts: async () => {
      return Post.find({});
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
  },
};

module.exports = resolvers;
