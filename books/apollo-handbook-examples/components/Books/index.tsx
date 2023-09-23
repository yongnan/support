export type Book = {
  id: string;
  title: string;
};

function Books({ books }: { books: Book[] }) {
  return (
    <ul>
      {books.map((book, idx) => (
        <li key={idx}>{book.title}</li>
      ))}
    </ul>
  );
}

export default Books;
