import { gql } from 'graphql-tag'

export const booksWithTitleQuery = gql`
  query booksWithTitle($title: String!) {
    booksWithTitle(title: $title) {
      id
      title
    }
  }
`  
export const userQuery = gql`
  query user($username: String!) {
    result: user(username: $username) {
        ... on SuspendedUser {
            id
            username
            suspensionReason
        }
        ... on User {
            id
            username
        }
    }
  }
  `  
