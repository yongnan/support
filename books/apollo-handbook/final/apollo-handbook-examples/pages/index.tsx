import Books, { Book } from "components/Books";

const books: Book[] = [
  {
    id: "1",
    title: "The Apollo Handbook",
  },
];


function App() {
  return (
    <div className="my-4 mx-auto px-4">
      <Books books={books} />
    </div>
  );
}

export default App;
