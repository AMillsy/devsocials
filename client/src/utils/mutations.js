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
  mutation CreateComment($postId: ID!, $message: String!) {
    createComment(postId: $postId, message: $message) {
      _id
      message
      likes
      date
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
    followUser(userID: $userId) {
      username
      following {
        _id
        username
      }
    }
  }
`;
