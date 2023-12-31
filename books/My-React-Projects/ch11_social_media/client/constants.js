import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($userName: String!, $password: String!) {
    loginUser(userName: $userName, password: $password) {
      userName
      token
    }
  }
`;

export const GET_POST = gql`
  query getPost($userName: String!) {
    post(userName: $userName) {
      id
      userName
      image
      text
      stars {
        userName
      }
      comments {
        id
        userName
        text
      }
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      userName
      image
      text
      totalStars
      totalComments
    }
  }
`;

export const ADD_POST = gql`
    mutation addPost($image: String!, $text: String!) {
        addPost(image: $image, text: $text) {
            image
        }    
    }
`;

export const GET_NOTIFICATIONS = gql`
   query getNotifications {
     notifications {
       id @client
       title @client
       body @client
     }
   }
`;

export const ADD_NOTIFICATION = gql`
   mutation {
     addNotification(id: $id, title: $title, body: $body) @client
   }
`;

export const STORE_EXPO_TOKEN = gql`
  mutation storeExpoToken($expoToken: String!) {
    storeExpoToken(expoToken: $expoToken) {
      expoToken
    }
  }
`;