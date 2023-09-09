const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Upload
  type UploadFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

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
    commentCount: Int
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    posts: [Post]
  }

  type PostData {
    user: User
    Post: Post
  }
  type Query {
    posts: [Post]
    users: [User]
    userProfile(_id: ID!): User
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createPost(
      title: String!
      description: String
      image: Upload!
      userId: ID!
    ): PostData
    singleUpload(file: Upload!): UploadFileResponse
  }
`;

module.exports = typeDefs;
