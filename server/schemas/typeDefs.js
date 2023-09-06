const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Comment {
    user: User
    message: String
    likes: Int
  }

  type Post {
    _id: ID
    title: String!
    description: String
    image: String!
    likes: Int
    comments: [Comment]
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    posts: [Post]
  }

  type Query {
    posts: [Post]
  }
`;

module.exports = typeDefs;
