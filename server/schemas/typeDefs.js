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

  type Auth {
    token: ID!
    user: User
  }

  type Comment {
    _id: ID
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
    date: Date
    comments: [Comment]
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
    getComments(_id: ID!): Comment
    userProfile(_id: ID!): User
    me: User
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    loginUser(username: String!, password: String!): Auth
    createPost(
      title: String!
      description: String
      image: Upload!
      userId: ID!
    ): PostData
    singleUpload(file: Upload!): UploadFileResponse
    multiUpload(files: [Upload!]): [UploadFileResponse]
  }
`;

module.exports = typeDefs;
