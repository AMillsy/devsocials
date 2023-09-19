import { gql } from "@apollo/client";

export const SINGLE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      encoding
      filename
      mimetype
      url
    }
  }
`;

export const MULTI_UPLOAD = gql`
  mutation MultiUpload($files: [Upload!]) {
    multiUpload(files: $files) {
      encoding
      filename
      mimetype
      url
    }
  }
`;
export const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation Mutation($title: String!, $file: [Upload]!, $description: String) {
    createPost(title: $title, file: $file, description: $description) {
      _id
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation Mutation($postId: ID!, $message: String) {
    createComment(postId: $postId, message: $message) {
      _id
      date
      likes
      message
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation(
    $username: String
    $file: Upload
    $location: String
    $job: String
    $skills: [String]
  ) {
    updateUser(
      username: $username
      file: $file
      location: $location
      job: $job
      skills: $skills
    ) {
      _id
      username
      skills
      location
      job
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation Mutation($userId: ID) {
    followUser(userId: $userId) {
      username
      following {
        _id
        username
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnFollowUser($userId: ID!) {
    unFollowUser(userId: $userId) {
      _id
      username
    }
  }
`;

export const ADD_LIKE = gql`
  mutation Mutation($postId: ID!) {
    addLike(postId: $postId) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $postId: ID!
    $title: String
    $description: String
    $file: [Upload]
  ) {
    updatePost(
      postId: $postId
      title: $title
      description: $description
      file: $file
    ) {
      _id
    }
  }
`;
