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
      title
      likeCount
      description
      date
      commentCount
      user {
        _id
        username
        image
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query GetComments($id: ID!) {
    getComments(_id: $id) {
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

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      job
      location
      skills
      image
      posts {
        _id
        title
        image
        description
        date
        likeCount
        commentCount
      }
    }
  }
`;

export const QUERY_ME_USERNAME = gql`
  query Me {
    me {
      username
    }
  }
`;

export const QUERY_ME_HOMEPAGE_FOLLOW = gql`
  query Me {
    me {
      following {
        username
        image
        _id
      }
    }
  }
`;
export const QUERY_ME_SKILLS = gql`
  query Me {
    me {
      skills
    }
  }
`;

export const QUERY_ME_FOLLOWING = gql`
  query Follows {
    follows {
      _id
      followed
      following
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
      _id
      username
      job
      location
      skills
      image
      posts {
        _id
        title
        image
        description
        date
        likeCount
        commentCount
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query FindPost($postId: ID!) {
    findPost(postId: $postId) {
      title
      image
      description
    }
  }
`;
