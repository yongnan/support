# Mobx-State-Tree

# Types overview

## Complex types

- [`types.model(properties, actions)`](https://mobx-state-tree.js.org/API/#model) Defines a "class like" type with properties and actions to operate on the object.
- [`types.array(type)`](https://mobx-state-tree.js.org/API/#array) Declares an array of the specified type.
- [`types.map(type)`](https://mobx-state-tree.js.org/API/#map) Declares a map of the specified type.

## Primitive types

- [`types.string`](https://mobx-state-tree.js.org/API/#const-string)
- [`types.number`](https://mobx-state-tree.js.org/API/#const-number)
- [`types.integer`](https://mobx-state-tree.js.org/API/#const-integer)
- [`types.boolean`](https://mobx-state-tree.js.org/API/#const-boolean)
- [`types.Date`](https://mobx-state-tree.js.org/API/#const-dateprimitive)
- [`types.custom`](https://mobx-state-tree.js.org/API/#custom) creates a custom primitive type. This is useful to define your own types that map a serialized form one-to-one to an immutable object like a Decimal or Date.

## Utility types

- [`types.union(options?: { dispatcher?: (snapshot) => Type, eager?: boolean }, types...)`](https://mobx-state-tree.js.org/API/#union) create a union of multiple types. If the correct type cannot be inferred unambiguously from a snapshot, provide a dispatcher function to determine the type. When `eager` flag is set to `true` (default) - the first matching type will be used, if set to `false` the type check will pass only if exactly 1 type matches.
- [`types.optional(type, defaultValue, optionalValues?)`](https://mobx-state-tree.js.org/API/#optional) marks a value as being optional (in e.g. a model). If a value is not provided/`undefined` (or set to any of the primitive values passed as an optional `optionalValues` array) the `defaultValue` will be used instead. If `defaultValue` is a function, it will be evaluated. This can be used to generate, for example, IDs or timestamps upon creation.
- [`types.literal(value)`](https://mobx-state-tree.js.org/API/#literal) can be used to create a literal type, where the only possible value is specifically that value. This is very powerful in combination with `union`s. E.g. `temperature: types.union(types.literal("hot"), types.literal("cold"))`.
- [`types.enumeration(name?, options: string[\])`](https://mobx-state-tree.js.org/API/#enumeration) creates an enumeration. This method is a shorthand for a union of string literals. If you are using typescript and want to create a type based on an string enum (e.g. `enum Color { ... }`) then use `types.enumeration<Color>("Color", Object.values(Color))`, where the `"Color"` name argument is optional.
- [`types.refinement(name?, baseType, (snapshot) => boolean)`](https://mobx-state-tree.js.org/API/#refinement) creates a type that is more specific than the base type, e.g. `types.refinement(types.string, value => value.length > 5)` to create a type of strings that can only be longer than 5.
- [`types.maybe(type)`](https://mobx-state-tree.js.org/API/#maybe) makes a type optional and nullable. The value `undefined` will be used to represent nullability. Shorthand for `types.optional(types.union(type, types.literal(undefined)), undefined)`.
- [`types.maybeNull(type)`](https://mobx-state-tree.js.org/API/#maybeNull) like `maybe`, but uses `null` to represent the absence of a value.
- [`types.null`](https://mobx-state-tree.js.org/API/#const-nulltype) the type of `null`.
- [`types.undefined`](https://mobx-state-tree.js.org/API/#const-undefinedtype) the type of `undefined`.
- [`types.late(() => type)`](https://mobx-state-tree.js.org/API/#late) can be used to create recursive or circular types, or types that are spread over files in such a way that circular dependencies between files would be an issue otherwise.
- `types.frozen(subType? | defaultValue?)`
  - `types.frozen()` - behaves the same as types.frozen in MST 2.
  - `types.frozen(subType)` - provide a valid MST type and frozen will check if the provided data conforms the snapshot for that type. Note that the type will not actually be instantiated, so it can only be used to check the shape of the data. Adding views or actions to SubType would be pointless.
  - `types.frozen(someDefaultValue)` - provide a primitive value, object or array, and MST will infer the type from that object, and also make it the default value for the field
  - (Typescript) `types.frozen<TypeScriptType>(...)` - provide a typescript type, to help in strongly typing the field (design time only)
- [`types.compose(name?, type1...typeX)`](https://mobx-state-tree.js.org/API/#compose), creates a new model type by taking a bunch of existing types and combining them into a new one.
- [`types.reference(targetType)`](https://mobx-state-tree.js.org/API/#reference) creates a property that is a reference to another item of the given `targetType` somewhere in the same tree. See [references](https://mobx-state-tree.js.org/concepts/references#references) for more details.
- [`types.safeReference(targetType)`](https://mobx-state-tree.js.org/API/#safereference) is like a standard reference, except that it accepts the undefined value by default and automatically sets itself to undefined (when the parent is a model) / removes itself from arrays and maps when the reference it is pointing to gets detached/destroyed. See [references](https://mobx-state-tree.js.org/concepts/references#references) for more details.
- [`types.snapshotProcessor(type, processors, name?)`](https://mobx-state-tree.js.org/API/#snapshotprocessor) runs a pre snapshot / post snapshot processor before/after serializing a given type. Example:

## Property types

Property types can only be used as a direct member of a `types.model` type and not further composed (for now).

- [`types.identifier`](https://mobx-state-tree.js.org/API/#const-identifier) Only one such member can exist in a `types.model` and should uniquely identify the object. See [identifiers](https://mobx-state-tree.js.org/concepts/references#identifiers) for more details.

[`types.identifierNumber`](https://mobx-state-tree.js.org/API/#const-identifiernumber) Similar to `types.identifier`. However, during serialization, the identifier value will be parsed from / serialized to a number.

# Using snapshots as values

## `cast`

```typescript
const Task = types.model({
    done: false
})
const Store = types.model({
    tasks: types.array(Task),
    selection: types.maybe(Task)
})

const s = Store.create({ tasks: [] })
// `{}` is a valid snapshot of Task, and hence a valid task, MST allows this, but TS doesn't, so we need to use 'cast'
s.tasks.push(cast({}))
s.selection = cast({})
```

## `SnapshotOrInstance<T>`

```typescript
const Task = types.model({
    done: false
})
const Store = types
    .model({
        tasks: types.array(Task)
    })
    .actions(self => ({
        addTask(task: SnapshotOrInstance<typeof Task>) {
            self.tasks.push(cast(task))
        },
        replaceTasks(tasks: SnapshotOrInstance<typeof self.tasks>) {
            self.tasks = cast(tasks)
        }
    }))

const s = Store.create({ tasks: [] })

s.addTask({})
// or
s.addTask(Task.create({}))

s.replaceTasks([{ done: true }])
// or
s.replaceTasks(types.array(Task).create([{ done: true }]))
```

##  `castToSnapshot`

```typescript
const task = Task.create({ done: true })
const Store = types.model({
    tasks: types.array(Task)
})

// we cast the task instance to a snapshot so it can be used as part of another snapshot without typing errors
const s = Store.create({ tasks: [castToSnapshot(task)] })
```

##  `castToReferenceSnapshot`

```
const task = Task.create({ id: types.identifier, done: true })
const Store = types.model({
    tasks: types.array(types.reference(Task))
})

// we cast the task instance to a reference snapshot so it can be used as part of another snapshot without typing errors
const s = Store.create({ tasks: [castToReferenceSnapshot(task)] })
```

# Sample Codes

#### Data Validation

```jsx
 const Store = types
      .model("Store", {
        todoList: types.array(types.string)
      })
      .actions(self => {
        return {
          addTodo(todo) {
            self.todoList.push(todo);
          },
          removeTodo(todo) {
            self.todoList.remove(todo);
          }
        };
      });

    const store = Store.create({
      todoList: ["Buy milk"]
    });
```

#### References

```jsx
 const Todo = types
      .model("Todo", {
        id: types.optional(types.identifier, () => Math.random().toString()),
        text: types.string
      })  
```

```jsx
 const Store = types
      .model("Store", {
        todoList: types.array(Todo),
        selectedTodo: types.safeReference(Todo)
      })
      .actions(self => {
        return {
          /* ... */
          selectTodo(todo) {
            self.selectedTodo = todo.id;
          }
        };
      });
```

```jsx
 /* ... */
          <Text>Todos:</Text>
          {state.todoList.map(todo => {
            const selected = todo === state.selectedTodo;
            const backgroundColor = selected ? "#8f8" : "#fff";
            return (
              <TouchableOpacity
                style={[S.todoWrap, { backgroundColor }]}
                onPress={() => state.selectTodo(todo)}
              >
                <Text style={S.todoText}>{todo.text}</Text>
                <Button title="X" onPress={() => state.removeTodo(todo)} />
              </TouchableOpacity>
            );
          })}
          /* ... */ 
```

### Architecture

#### Async Actions

You just replace `await` with `yield` and `async function` with `function *`. 

```jsx
.actions(self => {
      return {
        getTodos: flow(function*() {
          self.loading = true;
          const response = yield getEnv(self).http.get("/todos");
          self.loading = false;
          self.todoList = response.data;
        })
      }
    })
```

#### Data Normalization

```jsx
export const AuthorStore = types
      .model("AuthorStore", {
        map: types.map(Author)
      })
      .actions(self => {
        return {
          // we use this to add authors to the collection
          processAuthorList(authorList) {
            for (const author of _.castArray(authorList)) {
              self.map.put(author);
            }
          }
        };
      })
      .actions(self => {
        return {
          createAuthor: flow(function*(params) {
            const env = getEnv(self);
            const response = yield env.http.post(`/authors`, params);
            self.processAuthorList(response.data);
            return response;
          }),

          readAuthorList: /* GET /authors */,
          readAuthor: /* GET /authors/:id */,
          updateAuthor: /* POST /authors/:id */,
          deleteAuthor: /* DELETE /authors/:id */
        };
      });
The BookStore model is similar except we normalize the nested Author entity
    export const BookStore = types
      .model("BookStore", {
        map: types.map(Book)
      })
      .actions(self => {
        return {
          // here we add books to the collection 
          // and normalize the nested author entity
          processBookList(bookList) {
            const { processAuthorList } = getRoot(self).authorStore; 
            for (const book of _.castArray(bookList)) {
              if (book.author) {
                processAuthorList(book.author);
                entity.author = book.author.id;
              }
              self.map.put(entity);
            }
          }
        };
      })
      .actions(self => {
        return {
          /* API CRUD operations */
        };
      });
```

