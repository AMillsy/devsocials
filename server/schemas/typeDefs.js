const { gql } = require("apollo-server-express");
const { GraphQLInt } = require("graphql");

const typeDefs = gql`
  scalar Date

  type Comment {
    user: User
    message: String
    likes: Int
    date: Date
  }

  type Post {
    _id: ID
    title: String!
    description: String
    image: String!
    likes: Int
    comments: [Comment]
    date: Date
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
    users: [User]
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
