# mobX

[source](https://mobx.js.org/README.html)

# Principles

MobX uses a uni-directional data flow where *actions* change the *state*, which in turn updates all affected *views*.

![Action, State, View](https://mobx.js.org/assets/action-state-view.png)

# Obeservable state

## makeObservable

Usage:

- `makeObservable(target, annotations?, options?)`

Inference rules:

- `observable` defines a trackable field that stores the state.
- `action` marks a method as action that will modify the state.
- `computed` marks a getter that will derive new facts from the state and cache its output.

### class + makeObservable

```jsx
import { makeObservable, observable, computed, action, flow } from "mobx"

class Doubler {
    value

    constructor(value) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action,
            fetch: flow
        })
        this.value = value
    }

    get double() {
        return this.value * 2
    }

    increment() {
        this.value++
    }

    *fetch() {
        const response = yield fetch("/api/value")
        this.value = response.json()
    }
}

```

## makeAutoObservable

Usage:

- `makeAutoObservable(target, overrides?, options?)`

Inference rules:

- All *own* properties become `observable`.
- All `get`ters become `computed`.
- All `set`ters become `action`.
- All *functions on prototype* become `autoAction`.
- All *generator functions on prototype* become `flow`. (Note that generator functions are not detectable in some transpiler configurations, if flow doesn't work as expected, make sure to specify `flow` explicitly.)
- Members marked with `false` in the `overrides` argument will not be annotated. For example, using it for read only fields such as identifiers.

### factory function + makeAutoObservable

````jsx
import { makeAutoObservable } from "mobx"

function createDoubler(value) {
    return makeAutoObservable({
        value,
        get double() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}
````

## observable

Usage:

- `observable(source, overrides?, options?)`

### observable

```jsx
import { observable } from "mobx"

const todosById = observable({
    "TODO-123": {
        title: "find a decent task management system",
        done: false
    }
})

todosById["TODO-456"] = {
    title: "close all tickets older than two weeks",
    done: true
}

const tags = observable(["high prio", "medium prio", "low prio"])
tags.push("prio: for fun")
```

# Actions

Usage:

- `action` *(annotation)*
- `action(fn)`
- `action(name, fn)`

## Wrapping functions using `action`

```jsx
const ResetButton = ({ formState }) => (
    <button
        onClick={action(e => {
            formState.resetPendingUploads()
            formState.resetValues()
            e.preventDefault()
        })}
    >
        Reset form
    </button>
)
```

```jsx
import { observable, action } from "mobx"

const state = observable({ value: 0 })

const increment = action(state => {
    state.value++
    state.value++
})

increment(state)
```

## action.bound

```jsx
import { makeObservable, observable, action } from "mobx"

class Doubler {
    value = 0

    constructor(value) {
        makeObservable(this, {
            value: observable,
            increment: action.bound
        })
    }

    increment() {
        this.value++
        this.value++
    }
}

const doubler = new Doubler()

// Calling increment this way is safe as it is already bound.
setInterval(doubler.increment, 1000)
```

## runInAction

```jsx
import { observable, runInAction } from "mobx"

const state = observable({ value: 0 })

runInAction(() => {
    state.value++
    state.value++
})
```

# Computeds

Usage:

- `computed` *(annotation)*
- `computed(options)` *(annotation)*
- `computed(fn, options?)`

Example:

```jsx
import { makeObservable, observable, computed, autorun } from "mobx"

class OrderLine {
    price = 0
    amount = 1

    constructor(price) {
        makeObservable(this, {
            price: observable,
            amount: observable,
            total: computed
        })
        this.price = price
    }

    get total() {
        console.log("Computing...")
        return this.price * this.amount
    }
}

const order = new OrderLine(0)

const stop = autorun(() => {
    console.log("Total: " + order.total)
})
// Computing...
// Total: 0

console.log(order.total)
// (No recomputing!)
// 0

order.amount = 5
// Computing...
// (No autorun)

order.price = 2
// Computing...
// Total: 10

stop()

order.price = 3
// Neither the computation nor autorun will be recomputed.
```

# Reactions

## Autorun

Usage:

- `autorun(effect: (reaction) => void, options?)`

example:

```jsx
import { makeAutoObservable, autorun } from "mobx"

class Animal {
    name
    energyLevel

    constructor(name) {
        this.name = name
        this.energyLevel = 100
        makeAutoObservable(this)
    }

    reduceEnergy() {
        this.energyLevel -= 10
    }

    get isHungry() {
        return this.energyLevel < 50
    }
}

const giraffe = new Animal("Gary")

autorun(() => {
    console.log("Energy level:", giraffe.energyLevel)
})

autorun(() => {
    if (giraffe.isHungry) {
        console.log("Now I'm hungry!")
    } else {
        console.log("I'm not hungry!")
    }
})

console.log("Now let's change state!")
for (let i = 0; i < 10; i++) {
    giraffe.reduceEnergy()
}
```

Output:

```
Energy level: 100
I'm not hungry!
Now let's change state!
Energy level: 90
Energy level: 80
Energy level: 70
Energy level: 60
Energy level: 50
Energy level: 40
Now I'm hungry!
Energy level: 30
Energy level: 20
Energy level: 10
Energy level: 0
```

## Reaction

Usage:

- `reaction(() => value, (value, previousValue, reaction) => { sideEffect }, options?)`.

Example:

```jsx
import { makeAutoObservable, reaction } from "mobx"

class Animal {
    name
    energyLevel

    constructor(name) {
        this.name = name
        this.energyLevel = 100
        makeAutoObservable(this)
    }

    reduceEnergy() {
        this.energyLevel -= 10
    }

    get isHungry() {
        return this.energyLevel < 50
    }
}

const giraffe = new Animal("Gary")

reaction(
    () => giraffe.isHungry,
    isHungry => {
        if (isHungry) {
            console.log("Now I'm hungry!")
        } else {
            console.log("I'm not hungry!")
        }
        console.log("Energy level:", giraffe.energyLevel)
    }
)

console.log("Now let's change state!")
for (let i = 0; i < 10; i++) {
    giraffe.reduceEnergy()
}
```

Output:

```
Now let's change state!
Now I'm hungry!
Energy level: 40
```

## When

Usage:

- `when(predicate: () => boolean, effect?: () => void, options?)`
- `when(predicate: () => boolean, options?): Promise`

Example:

```jsx
import { when, makeAutoObservable } from "mobx"

class MyResource {
    constructor() {
        makeAutoObservable(this, { dispose: false })
        when(
            // Once...
            () => !this.isVisible,
            // ... then.
            () => this.dispose()
        )
    }

    get isVisible() {
        // Indicate whether this item is visible.
    }

    dispose() {
        // Clean up some resources.
    }
}
```

### `await when(...)`

If no `effect` function is provided, `when` returns a `Promise`.  Use `async / await` to wait for changes in observable state.

```js
async function() {
    await when(() => that.isVisible)
    // etc...
}
```



# React integration

## external state

Timer class:

```jsx
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import Layout from "../components/layout"

export class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}
```

### useing props

```jsx
import { observer } from "mobx-react-lite"

const myTimer = new Timer() // See the Timer definition above.

const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

// Pass myTimer as a prop.
ReactDOM.render(<TimerView timer={myTimer} />, document.body)
```

### using global variables

````jsx
const myTimer = new Timer() // See the Timer definition above.

// No props, `myTimer` is directly consumed from the closure.
const TimerView = observer(() => <span>Seconds passed: {myTimer.secondsPassed}</span>)

ReactDOM.render(<TimerView />, document.body)
````

### using React context

```jsx
import {observer} from 'mobx-react-lite'
import {createContext, useContext} from "react"

const TimerContext = createContext<Timer>()

const TimerView = observer(() => {
    // Grab the timer from the context.
    const timer = useContext(TimerContext) // See the Timer definition above.
    return (
        <span>Seconds passed: {timer.secondsPassed}</span>
    )
})

ReactDOM.render(
    <TimerContext.Provider value={new Timer()}>
        <TimerView />
    </TimerContext.Provider>,
    document.body
)
```

## local observable state

### `useState` with observable class

```jsx
import { observer } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() => new Timer()) // See the Timer definition above.
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
// If you want to automatically update the timer like we did in the // // original example, useEffect could be used in typical React fashion:

useEffect(() => {
    const handle = setInterval(() => {
        timer.increaseTimer()
    }, 1000)
    return () => {
        clearInterval(handle)
    }
}, [timer])
```

### `useState` with local observable object

```jsx
import { observer } from "mobx-react-lite"
import { observable } from "mobx"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() =>
        observable({
            secondsPassed: 0,
            increaseTimer() {
                this.secondsPassed++
            }
        })
    )
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```

### `useLocalObservable` hook

```jsx
import { observer, useLocalObservable } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const timer = useLocalObservable(() => ({
        secondsPassed: 0,
        increaseTimer() {
            this.secondsPassed++
        }
    }))
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```

# Tips & Tricks

## Defining data stores

### Domain stores

#### Example domain store

```jsx
import { makeAutoObservable, runInAction, reaction } from "mobx"
import uuid from "node-uuid"

export class TodoStore {
    authorStore
    transportLayer
    todos = []
    isLoading = true

    constructor(transportLayer, authorStore) {
        makeAutoObservable(this)
        this.authorStore = authorStore // Store that can resolve authors.
        this.transportLayer = transportLayer // Thing that can make server requests.
        this.transportLayer.onReceiveTodoUpdate(updatedTodo =>
            this.updateTodoFromServer(updatedTodo)
        )
        this.loadTodos()
    }

    // Fetches all Todos from the server.
    loadTodos() {
        this.isLoading = true
        this.transportLayer.fetchTodos().then(fetchedTodos => {
            runInAction(() => {
                fetchedTodos.forEach(json => this.updateTodoFromServer(json))
                this.isLoading = false
            })
        })
    }

    // Update a Todo with information from the server. Guarantees a Todo only
    // exists once. Might either construct a new Todo, update an existing one,
    // or remove a Todo if it has been deleted on the server.
    updateTodoFromServer(json) {
        let todo = this.todos.find(todo => todo.id === json.id)
        if (!todo) {
            todo = new Todo(this, json.id)
            this.todos.push(todo)
        }
        if (json.isDeleted) {
            this.removeTodo(todo)
        } else {
            todo.updateFromJson(json)
        }
    }

    // Creates a fresh Todo on the client and the server.
    createTodo() {
        const todo = new Todo(this)
        this.todos.push(todo)
        return todo
    }

    // A Todo was somehow deleted, clean it from the client memory.
    removeTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
        todo.dispose()
    }
}

// Domain object Todo.
export class Todo {
    id = null // Unique id of this Todo, immutable.
    completed = false
    task = ""
    author = null // Reference to an Author object (from the authorStore).
    store = null
    autoSave = true // Indicator for submitting changes in this Todo to the server.
    saveHandler = null // Disposer of the side effect auto-saving this Todo (dispose).

    constructor(store, id = uuid.v4()) {
        makeAutoObservable(this, {
            id: false,
            store: false,
            autoSave: false,
            saveHandler: false,
            dispose: false
        })
        this.store = store
        this.id = id

        this.saveHandler = reaction(
            () => this.asJson, // Observe everything that is used in the JSON.
            json => {
                // If autoSave is true, send JSON to the server.
                if (this.autoSave) {
                    this.store.transportLayer.saveTodo(json)
                }
            }
        )
    }

    // Remove this Todo from the client and the server.
    delete() {
        this.store.transportLayer.deleteTodo(this.id)
        this.store.removeTodo(this)
    }

    get asJson() {
        return {
            id: this.id,
            completed: this.completed,
            task: this.task,
            authorId: this.author ? this.author.id : null
        }
    }

    // Update this Todo with information from the server.
    updateFromJson(json) {
        this.autoSave = false // Prevent sending of our changes back to the server.
        this.completed = json.completed
        this.task = json.task
        this.author = this.store.authorStore.resolveAuthor(json.authorId)
        this.autoSave = true
    }

    // Clean up the observer.
    dispose() {
        this.saveHandler()
    }
}
```

### UI stores

example:

```jsx
import { makeAutoObservable, observable, computed } from "mobx"

export class UiState {
    language = "en_US"
    pendingRequestCount = 0

    // .struct makes sure observer won't be signaled unless the
    // dimensions object changed in a deepEqual manner.
    windowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    constructor() {
        makeAutoObservable(this, { windowDimensions: observable.struct })
        window.onresize = () => {
            this.windowDimensions = getWindowDimensions()
        }
    }

    get appIsInSync() {
        return this.pendingRequestCount === 0
    }
}
```

#### Combining multiple stores

```jsx
class RootStore {
    constructor() {
        this.userStore = new UserStore(this)
        this.todoStore = new TodoStore(this)
    }
}

class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore
    }

    getTodos(user) {
        // Access todoStore through the root store.
        return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
    }
}

class TodoStore {
    todos = []
    rootStore

    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore
    }
}
```

## Computeds with arguments {🚀}