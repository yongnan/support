import { gql } from 'graphql-tag'
import {useDebouncedCallback} from "use-debounce"
import { BooksQueryQuery, useBooksQueryLazyQuery} from '../../lib/graphql-local_generated'
import { client2 } from '../../lib/client'

function Books({ books }: { books: BooksQueryQuery["books"] }) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}

function WrappedBooks(){
  const [ loadBooks , {loading, error, data }] = useBooksQueryLazyQuery({client: client2});

  const _findBook = (title: string) => {
    loadBooks({ variables: { searchString: title }})
  }
  const findBook = useDebouncedCallback(_findBook, 500)

  const renderResults = () => {
    if (loading) {
      return <span>Loading...</span>;
    }

    if (error) {
      return <span>Something went wrong: ${error}</span>;
    }

    return data && <Books books={data.books} />
  }

  return (
    <div>
        <h1>Books</h1>
        <input
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tightfocus:outline-nonefocus:shadow-outlinemb-4"
          placeholder="Search..."
          type="text"
          onFocus={(e) => findBook(e.target.value)}
          onChange={(e) => findBook(e.target.value)}
        />
        {renderResults()}
    </div> 
  );
}

export default WrappedBooks;