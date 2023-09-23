import { gql } from 'graphql-tag'

export const booksQuery = gql`
  query booksQuery($searchString: String!) {
    books(searchString: $searchString) {
      id
      title
    }
  }
`  

export const createBookMutation = gql`
  mutation createBook($title: String!) {
    createBook(data: {title: $title}) {
      id
      title
    }
  }
`
