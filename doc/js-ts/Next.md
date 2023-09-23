# Next.js

# Pages

## Static Generation (SSG)

best suit:

* for pages with content that changes rarely
* example: landing pages, login pages, etc.

```javascript
export async function getStaticPaths() {
  return {
    props: {
      todo: todos.find((todo) => todo.id === todoId),
    },
    fallback: //values – true, false and blocking.
  };
}  
export async function getStaticProps(context) {
  const todoId = context.params.id;
  const filePath = path.join(process.cwd(), "data", "todos.json");
  const todosData = fs.readFileSync(filePath, "utf8");
  const todos = JSON.parse(todosData).todos;

  return {
    props: {
      todo: todos.find((todo) => todo.id === todoId),
    },
  };
}  
```

fallback:

* false => 404 page
* true => fallback page
* blocking => the page is generated on the server, served to the user, and then cached. 

## Server Side Render (SSR)

best fits:

* if the page contains frequently updated data or is based on the user’s request.
* for pages like news feed, marketing pages, etc.
* **the user has to wait for the page to be served**, should be used only when needed.

```javascript
export async function getServerSideProps() {
  return {
    props: {
      todos: JSON.parse(todosData).todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
      })),
      generationDate: new Date().toLocaleTimeString(),
    },
  };
}  
```

## Client Side Render (CSR)

```js
const TodosCSR = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await getTodos();
      setTodos(res);
    };

    fetchTodos();
  }, []);
  ...
```

## INCREMENTAL STATIC REGENERATION (ISR)

It is not revalidating the page every interval, but serve stale data(cache) to the user while revalidating. => only the page is visiting the revlidate interval is checked.

This means that if the page hasn’t been visited for a week, then no matter the value of revalidate, it won’t be revalidated, and this prevents unnecessary API requests.

```javascript
export async function getStaticProps() {
  ...
  return {
    props: {
      todos: JSON.parse(todosData).todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
      })),
      generationDate: new Date().toLocaleTimeString(),
    },
    revalidate: 5,
  };
}
```

## AUTOMATIC STATIC OPTIMIZATION

**Next.js allows us to create hybrid applications that have both server-side generated and rendered pages**.

We can have the landing, login, and register page **statically generated**, our marketing page **server-side rendered**, our products listing page could **utilize ISR**, while the user’s account settings page could use **client-side rendering** – **all in one app, using just one framework**!
