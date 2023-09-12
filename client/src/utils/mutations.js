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
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      email
      password
      username
    }
  }
`;
