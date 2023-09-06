const { AuthenticationError } = require("apollo-server-express");
const { User, Post } = require("../models");
const resolvers = {
  Query: {
    posts: async () => {
      return Post.find({});
    },
  },

  /*Mutation: {},*/
};

module.exports = resolvers;
