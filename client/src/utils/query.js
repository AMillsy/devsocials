import { gql } from "@apollo/client";

/**It will return data.posts*/
/**
 * const {loading, error, data} = useQuery(QUERY_POST);
 */
export const QUERY_POST = gql`
  query Posts {
    posts {
      _id
      image
      likes
      title
      description
      date
      commentCount
    }
  }
`;

/**Need to send through a ID, just send a string of the profile you have clicked on */
/**
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { _id },
  });
 */
export const QUERY_USER = gql`
  query UserProfile($id: ID!) {
    userProfile(_id: $id) {
      username
      posts {
        _id
        title
        description
        image
        likes
        date
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query GetComments($id: ID!) {
    getComments(_id: $id) {
      date
      likes
      message
      user {
        username
      }
    }
  }
`;
