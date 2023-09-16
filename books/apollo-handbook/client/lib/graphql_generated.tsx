import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Book = {
  __typename?: 'Book';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Mutation = {
  __typename?: 'Mutation';
  createBook: Book;
};


export type MutationCreateBookArgs = {
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  books: Array<Book>;
  booksWithTitle: Array<Book>;
  user: UserResult;
};


export type QueryBooksWithTitleArgs = {
  title: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type SuspendedUser = {
  __typename?: 'SuspendedUser';
  id: Scalars['ID'];
  suspensionReason: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserResult = SuspendedUser | User;

export type BooksWithTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type BooksWithTitleQuery = { __typename?: 'Query', booksWithTitle: Array<{ __typename?: 'Book', id: string, title: string }> };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', result: { __typename?: 'SuspendedUser', id: string, username: string, suspensionReason: string } | { __typename?: 'User', id: string, username: string } };


export const BooksWithTitleDocument = gql`
    query booksWithTitle($title: String!) {
  booksWithTitle(title: $title) {
    id
    title
  }
}
    `;

/**
 * __useBooksWithTitleQuery__
 *
 * To run a query within a React component, call `useBooksWithTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksWithTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksWithTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useBooksWithTitleQuery(baseOptions: Apollo.QueryHookOptions<BooksWithTitleQuery, BooksWithTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksWithTitleQuery, BooksWithTitleQueryVariables>(BooksWithTitleDocument, options);
      }
export function useBooksWithTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksWithTitleQuery, BooksWithTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksWithTitleQuery, BooksWithTitleQueryVariables>(BooksWithTitleDocument, options);
        }
export type BooksWithTitleQueryHookResult = ReturnType<typeof useBooksWithTitleQuery>;
export type BooksWithTitleLazyQueryHookResult = ReturnType<typeof useBooksWithTitleLazyQuery>;
export type BooksWithTitleQueryResult = Apollo.QueryResult<BooksWithTitleQuery, BooksWithTitleQueryVariables>;
export const UserDocument = gql`
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
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;