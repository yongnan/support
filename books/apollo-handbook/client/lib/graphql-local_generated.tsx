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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Book = {
  __typename?: 'Book';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
};

export type BookCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook?: Maybe<Book>;
  deleteBook?: Maybe<Book>;
};


export type MutationCreateBookArgs = {
  authorEmail?: InputMaybe<Scalars['String']>;
  data: BookCreateInput;
};


export type MutationDeleteBookArgs = {
  id: Scalars['Int'];
};

export type OrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Query = {
  __typename?: 'Query';
  books: Array<Book>;
};


export type QueryBooksArgs = {
  orderBy?: InputMaybe<OrderByUpdatedAtInput>;
  searchString?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type BooksQueryQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type BooksQueryQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: number, title: string }> };

export type CreateBookMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook?: { __typename?: 'Book', id: number, title: string } | null };


export const BooksQueryDocument = gql`
    query booksQuery($searchString: String!) {
  books(searchString: $searchString) {
    id
    title
  }
}
    `;

/**
 * __useBooksQueryQuery__
 *
 * To run a query within a React component, call `useBooksQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQueryQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useBooksQueryQuery(baseOptions: Apollo.QueryHookOptions<BooksQueryQuery, BooksQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BooksQueryQuery, BooksQueryQueryVariables>(BooksQueryDocument, options);
      }
export function useBooksQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BooksQueryQuery, BooksQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BooksQueryQuery, BooksQueryQueryVariables>(BooksQueryDocument, options);
        }
export type BooksQueryQueryHookResult = ReturnType<typeof useBooksQueryQuery>;
export type BooksQueryLazyQueryHookResult = ReturnType<typeof useBooksQueryLazyQuery>;
export type BooksQueryQueryResult = Apollo.QueryResult<BooksQueryQuery, BooksQueryQueryVariables>;
export const CreateBookDocument = gql`
    mutation createBook($title: String!) {
  createBook(data: {title: $title}) {
    id
    title
  }
}
    `;
export type CreateBookMutationFn = Apollo.MutationFunction<CreateBookMutation, CreateBookMutationVariables>;

/**
 * __useCreateBookMutation__
 *
 * To run a mutation, you first call `useCreateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookMutation, { data, loading, error }] = useCreateBookMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateBookMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookMutation, CreateBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, options);
      }
export type CreateBookMutationHookResult = ReturnType<typeof useCreateBookMutation>;
export type CreateBookMutationResult = Apollo.MutationResult<CreateBookMutation>;
export type CreateBookMutationOptions = Apollo.BaseMutationOptions<CreateBookMutation, CreateBookMutationVariables>;