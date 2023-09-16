# React and Svelte. Here are the differences.

## React vs Svelte. Finally, a side-by-side code comparison! Because you’ve heard the fuss about Svelte, and now you want to know what the hype is all about.

Having used React at work, I had a fairly solid understanding of it. I had, however, heard of Svelte — a new JavaScript framework that has recently started gaining attention amongst the web development scene. And as a curious Web Developer, I had been curious to know what the grass was like on the other side of the fence — the grass in this scenario being Svelte.

I’d read the Svelte docs and watched a couple videos and, while they were useful, what I really wanted to know was how different Svelte was from React. By *“different”*, I didn’t mean things such as whether Svelte used a virtual DOM or how it went about rendering pages. I wanted someone to take the time to explain how my React code might look if I had written the same thing in Svelte! I wanted to find an article that took the time to explain this so that someone new to either React or Svelte (or Web Development as a whole) could gain a better understanding of the differences between the two.

Unfortunately, I couldn’t find anything that tackled this. So I came to the realisation that I would have to go ahead and build this myself in order to see the similarities and differences. In doing so, I thought I’d document the whole process so that an article on this will finally exist.

![img](https://miro.medium.com/max/700/1*ob02GMVKhUQJH9YqQLdoWA.png)

React vs Svelte: A new challenger approaches!

I decided to try and build a fairly standard To Do App that allows a user to add and delete items from the list. Both apps were built using CLIs (`create-react-app` for React, and `sveltejs/template` for Svelte).

*CLI stands for Command Line Interface by the way. 🤓*

# Anyway, this intro is already longer than I’d anticipated. So let’s start by having a quick look at how the two apps look:

![img](https://miro.medium.com/max/700/1*9polCAouiiVgAEHpR2JKSA.png)

React vs Svelte. The two apps look the same, but does the code look the same too?

The CSS code for both apps are exactly the same, but there are differences in where these are located. With that in mind, let’s next have a look at the file structure of both apps:

![img](https://miro.medium.com/max/700/1*i_gnEpGffXWx0RhoRBP__w.png)

React on the left. Svelte on the right.

You’ll see that their structures are quite different here.

React has all of the components, styles and assets inside of the **src** folder, while Svelte requires the assets to sit directly in the **public** folder. You’ll also notice an absence of any **.css** files in the Svelte setup — this is because the styles are defined inside of the **.svelte** files (more on that later).

You will also notice that — for Svelte — there are some **config** files for Rollup. For those unaware, Rollup is basically a Webpack equivalent, which Svelte opts to use instead.

Finally, you’ll notice that Svelte already some **bundle** files inside of the **public** folder. These were created after I tried serving up the Svelte ToDo app to my localhost. Unlike React, Svelte’s CLI automatically generates these files as soon as you try starting up a local server. These are effectively the files that are being served to you, which are the compilations of all of the code from the **.svelte** files.

This is one key thing that Svelte does differently to React. In React, you would typically end up with a similar structure in your **public** file if you were to compile your code in order to get it ready to send to production and put live online, but whilst developing, if you were to serve your React ToDo app to the local server, you wouldn’t see these **bundle** files, as your code gets compiled by Webpack and then served to you in your localhost — and effectively sits somewhere in cache, whereas Rollup compiles the Svelte code and makes it visible for you in the **public** folder. Another difference caused here is that React’s setup with Webpack allows for hot module reloading (which basically means that the code will quite quickly update in your browser as you are making updates during development. With Svelte’s setup with Rollup, this isn’t possible, as those **bundle** files are effectively being recompiled, albeit quickly, every time you hit the save button to make an update in your code.

Ultimately, both file structures and approach to compilation achieve the same thing, just by different means.

*Enjoying this article? If so, get more similar content by* [***subscribing to Decoded, my YouTube channel\***](https://www.youtube.com/channel/UCtipWUghju290NWcn8jhyAw)***!\***

Hopping back to the CSS setup for React for a moment, there is nothing to say that you can’t go ahead and structure your CSS differently to adopt something that puts your styles inside of the same file as the component. It really comes down to personal preference. You will hear plenty of discussion from the dev community over how CSS should be structured, especially with regard to React, as there are a number of CSS-in-JS solutions such as styled-components, and emotion. CSS-in-JS is literally what it sounds like by the way. While these are useful, for now, we will just follow the structure laid out in both CLIs.

## Before we go any further, let’s take a quick look at what a typical React and Svelte component looks like:

![img](https://miro.medium.com/max/700/1*jusfKFvNcq_XyV6UsOMNKA.png)

Now that’s out of the way, let’s get into the nitty gritty detail!

# Creating a new application

## React

Using npm, run the following command in your terminal/command line:

```
npx create-react-app react-todo
```

That will create a project for you called ‘react-todo’ that will contain everything you need to get started. We used the same process for the app created for this article.

## Svelte

Using npm, run the following command in your terminal/command line:

```
npx degit sveltejs/template svelte-todo
```

That will create a project for you called ‘svelte-todo’ that will contain everything you need to get started. We used the same process for the app created for this article.

# How do we mutate data?

But first, what do we even mean by “mutate data”? Sounds a bit technical doesn’t it? It basically just means changing the data that we have stored. So if we wanted to change the value of a person’s name from John to Mark, we would be ‘mutating the data’. So the way in which we mutate data demonstrates a key difference between React and Svelte.

While Svelte essentially allows for data to be freely be updated (eg. we can push items into an array of data, reassign our data etc), React handles this through what is known as a state hook.

Let’s take a look at the set up for both in the images below, then we will explain what is going on after:

![img](https://miro.medium.com/max/554/0*NNgqC-aO4mx_kkoV.png)

![img](https://miro.medium.com/max/546/1*jDw9djDXDxGbVoZLA8PYFg.png)

React on the left. Svelte on the right.

So you can see that we have passed the same data into both, but the structure is a bit different.

With React — or at least since 2019 — we would typically handle state through a series of Hooks. These might look a bit strange at first if you haven’t seen this type of concept before. Basically, it works as follows:

Let’s say we want to create a list of todos. We would likely need to create a variable called `list` and it would likely take an array of either strings or maybe objects (if say we want to give each `todo` string an ID and maybe some other things. We would set this up by writing `const [list, setList] = useState([])`. Here we are using what React calls a Hook — called useState. This basically lets us keep local state within our components.

Also, you may have noticed that we passed in an empty array `[]` inside of `useState()`. What we put inside there is what we want `list` to initially be set to, which in our case, we want to be an empty array. However, you will see from the image above that we passed in some data inside of the array, which ends up being the initialised data for `list`. Wondering what `setList` does? There will be more on this later!

Now with Svelte, you will notice that we have two variables that we are exporting. These were located inside of our **ToDo.svelte** file, but can be placed higher up inside of our route **App.svelte** file if we wanted to.

Anyway, let’s just take another look at them, then we’ll explain what is going on:

```
export let todo = "";
export let list = [
  { id: 1, text: "clean the house" },
  { id: 2, text: "buy eggs" }
];
```

So with Svelte, if we want to refer to things such as `todo` and `list` in our file, we need to have created a reference to them somewhere in the same file.

This is no different to React, or most other JavaScript, whether it be through creating a variable, importing a variable, or passing a variable down to a component as props. The different here is that we’re effectively creating new variables (*with* `*let*`*, not* `*const*` *as that would prevent us from being able to mutate it — or reassign it if we want to get technical about how* `*const*` *works*). The reason why I mention that we have to create new variables is because you’ll later notice that we have to do this in every file that we want to refer to them, even if they’ve already been passed down as props. Basically what happens is that Svelte will then pass the values down to those newly created variables. If you’re confused, just continue reading on and you’ll see how this works when we refer to it again later.

So how do we reference our mutable data in our Svelte app?

Well, let’s say that we have some piece of data called `name` that has been assigned a value of `‘Sunil**’**`.

In Svelte, this `let name = Sunil`, will have either been created in a component and passed down to another as a prop, or just gets used inside of the component it was created in. Regardless of how we use `name`, we can update it by simply reassigning `name`. So I could write `name = ‘John'` and we would see the update in our screen in the UI. I’m not sure how I feel about being called John, but hey ho, things happen! 😅

In React, as we have our smaller pieces of state that we created with `useState()`, it is likely that we would have created something along the lines of `const [name, setName] = useState('Sunil')`. In our app, we would reference the same piece of data by calling simply calling `name`. Now the key difference here is that we cannot simply write `name = ‘John’`, because React has restrictions in place to prevent this kind of easy, care-free mutation-making. So in React, we would write `setName('John')`. This is where the `setName` bit comes into play. Basically, in `const [name, setName] = useState('Sunil')`, it creates two variables, one which becomes `const name = 'Sunil'`, while the second `const setName` is assigned a function that enables `name` to be recreated with a new value.

Effectively React and Svelte are doing the same thing here, which is creating data that can be updated. Svelte essentially combines its own version of `name` and `setName` by default whenever a piece of data gets updated. So in short, React requires that you call `setName()` with the value inside in order to update state, Svelte makes an assumption that you’d want to do this if you were ever trying to update values that appear in the DOM (ie. values that we can see on the screen in our browser). So Why does React even bother with separating the value from the function, and why is `useState()` even needed? It’s because this signifies to React wants it needs to re-render whenever state changes. It would know that the state has changed because the useState function was called.

![img](https://miro.medium.com/max/700/0*XyX9aVsjdVTFEoWX.png)

Bean knew best.

Now that we have mutations out of the way, let’s get into the nitty, gritty by looking at how we would go about adding new items to both of our To Do Apps.

# How do we create new To Do Items?

## React:

```
const createNewToDoItem = () => {  const newId = list.length ? 
                Math.max.apply(null, list.map(t => t.id)) + 1 :
                1;  const newToDo = { id: newId, text: toDo };  
  setList([...list, newToDo]);
  setToDo("");};
```

## How did React do that?

In React, our input field has an attribute on it called **value.** This value gets automatically updated every time its value changes through what is known as an **onChange event listener**. The JSX (which is basically a variant of HTML), looks like this:

```
<input type="text" 
       value={toDo} 
       onChange={handleInput}/>
```

So every time the value is changed, it updates state. The `handleInput` function looks like this:

```
const handleInput = (e) => {
  setToDo(e.target.value);
};
```

Now, whenever a user presses the **+** button on the page to add a new item, the **createNewToDoItem** function is triggered. Let’s take a look at that function again to break down what is going on:

```
const createNewToDoItem = () => {  const newId = list.length ? 
                Math.max.apply(null, list.map(t => t.id)) + 1 :
                1;  const newToDo = { id: newId, text: toDo };  
  setList([...list, newToDo]);
  setToDo("");};
```

Essentially the `newId` function is basically creating a new ID that we will give to our new `toDo` item. The `newToDo` variable is an object that takes that has an `id` key that is given the value from `newId`. It also has a `text` key which takes the value from `toDo` as its value. That is the same `toDo` that was being updated whenever the input value changed.

We then run out `setList` function and we pass in an array that includes our entire `list` as well as the newly created `newToDo`.

If the `...list`, bit seems strange, the three dots at the beginning is something known as a spread operator, which basically passes in all of the values from the `list` but as separate items, rather than simply passing in an entire array of items as an array. Confused? If so, I highly recommend reading up on spread because it’s great!

Anyway, finally we run `setToDo()` and pass in an empty string. This is so that our input value is empty, ready for new toDos to be typed in.

## Svelte:

```
createNewToDoItem() {  const newId = list.length ? 
                Math.max.apply(null, list.map(t => t.id)) + 1 :
                1;
 
  list.push({ id: newId, text: todo });
  todo = "";}
```

## How did Svelte do that?

In Svelte, our **input** field has a handle on it called **bind:value**. This allows us to do something known as **two-way binding**. Let’s just quickly look at our input field, then we’ll explain what is going on:

```
<input type="text" bind:value={todo} />
```

**bind:value** ties the input of this field to a variable we have called `todo`. When the page loads, we have `todo` set to an empty string, as such: `let todo = ‘’`. If this had some data already in there, such as `let todo = ‘add some text here’`**,** our input field would load with ***add some text here\*** already inside the input field. Anyway, going back to having it as an empty string, whatever text we type inside the input field gets bound to the value for `todo`. This is effectively two-way binding (the input field can update `todo` and `todo` can update the input field).

So looking back at the **createNewToDoItem()** code block from earlier, we see that we push the contents of `todo` into the `list` array and then update `todo` to an empty string.

We also used the same `newId()` function as used in the React example.

# How do we delete from the list?

## React:

```
const deleteItem = (item) => {
  setList(list.filter((todo) => todo.id !== id));
};
```

## How did React do that?

So whilst the `deleteItem()` function is located inside **ToDo.js**, I was very easily able to make reference to it inside **ToDoItem.js** by firstly, passing the `deleteItem()` function as a prop on `<ToDoItem/>` as such:

```
<ToDoItem deleteItem={deleteItem}/>
```

This firstly passes the function down to make it accessible to the child. Then, inside the **ToDoItem** component, we do the following:

```
<button className="ToDoItem-Delete" 
        onClick={() => deleteItem(item.id)}> - </button>
```

All I had to do to reference a function that sat inside the parent component was to reference **props.deleteItem**. Now you may have noticed that in the code example, we just wrote `deleteItem` instead of `props.deleteItem`. This is because we used a technique known as **destructuring** which allows us to take parts of the **props** object and assign them to variables. So in our **ToDoItem.js** file, we have the following:

```
const ToDoItem = (props) => {
  const { item, deleteItem } = props;
}
```

This created two variables for us, one called `item`, which gets assigned the same value as `props.item`, and `deleteItem`, which gets assigned the value from `props.deleteItem`. We could have avoided this whole destructuring thing by simply using `props.item` and `props.deleteItem`, but I thought it was worth mentioning!

## Svelte:

```
const deleteItem = id => {
  list = list.filter(item => item.id !== id);
};
```

## How did Svelte do that?

Quite a similar approach is deployed here in Svelte. In our **ToDo.svelte** file, we pass our `deleteItem` function down to `<ToDoItem/>` as such:

```
<ToDoItem {item} deleteItem={deleteItem}/>
```

Then in our **ToDoItem.svelte** file, we create a variable reference at the top of our file by writing `export let deleteItem;`. This allows us to make references to `deleteItem` as normal. Then finally, we pass our function to our ‘delete’ button inside of **ToDoItem.svelte**, like so:

```
<button class=”ToDoItem-Delete” 
        on:click={() => deleteItem(item.id)}> - </button>
```

As you can see, our ‘delete’ button is exactly the same as the one we used in React.

# How do we pass DOM event listeners?

## React:

Event listeners for simple things such as click events are straight forward. Here is an example of how we created a click event for a button that creates a new ToDo item:

```
<button className=”ToDo-Add” onClick={createNewToDoItem}>+</button>.
```

Super easy here and pretty much looks like how we would handle an onclick with regular JavaScript.

## Svelte:

In Svelte it is also pretty straight-forward. We simply use the **on:** handle, and then the type of event-listener we want to do. So for example, to add a click event listener, we could write **on:click**, as we have in the following example:

```
<button class="ToDo-Add" on:click={createNewToDoItem}>+</button>
```

One cool thing with Svelte event listeners is that there are also a bunch of things that you can chain on to them, such as **once** which prevents the event listener from being triggered more than once.

# How do we pass data/props to a child component?

## React:

In react, we pass props onto the child component at the point where it is created. Such as:

```
<ToDoItem key={key.id} item={todo} />
```

Here we see two props passed to the **ToDoItem** component. From this point on, we can now reference them in the child component via this.props. So to access the **item.todo** prop, we simply call **props.item**.

## Svelte:

In Svelte, it’s pretty much the same:

```
<ToDoItem {item} on:deleteItem={deleteItem} />
```

One difference here is that we didn’t have to pass a key to our **ToDoItem**, but hold that thought for a moment as we’ll cover that later.

Another difference is that we can pass `item` down by simply writing `{item}`. This is because the prop name and the actual prop have the same name. Writing `item={item}` would also work the same, but my Svelte setup automatically amended it to simply `{item}`.

Once this is done, we have to create a variable inside of our **ToDoItem.svelte** file called `item`, by writing `export let item;` towards the top of the **<script>** part of the file. This is so that we can refer to `item` in our file without getting any errors for trying to reference a variable that doesn’t exist. What you have to remember here is that during compilation, Svelte will then check to see if our **ToDoItem** was passed a prop with the name of `item`. In our case, it has, so the value of `item` that was passed down as a prop, will be assigned to our `export let item;`. This then allows our app to work as we would expect it to. These can then be referenced in the child by their name — so in our case, **‘todo**’.

# How do we emit data back to a parent component?

## React:

We firstly pass the function down to the child component by referencing it as a prop in the place where we call the child component. We then add the call to function on the child by whatever means, such as an **onClick**, by referencing **props.whateverTheFunctionIsCalled** — or **whateverTheFunctionIsCalled** if we have used destructuring. This will then trigger the function that sits in the parent component. We can see an example of this entire process in the section *‘How do we delete from the list’.*

## Svelte:

This is handled in a very similar way to how it is in React. We can see an example of this entire process in the section *‘How do we delete from the list’.*

# How do we loop through data inside of our components?

## React

In React we typically use higher order functions such as `map()`, `filter()` etc to loop through data to either pass the data through to html elements or to child components. This is how we implemented it in our code:

```
{list.map((item) => {
   return <ToDoItem key={item.id} 
                    item={item} 
                    deleteItem={deleteItem} />;
})}
```

This feels very similar to how we might use them in regular JavaScript.

## Svelte

In Svelte, we use `#each`, which is specific to Svelte. It is a means by which to loop through data. This is how we implemented it in our code:

```
{#each list as item, i (item.id)}
  <ToDoItem {item} on:deleteItem={deleteItem} />
{/each}
```

You’ll notice that we then take our `list` variable and follow it with `as item`. This is basically saying, take our `list`, and break it down to individual items which we will refer to as `item`. We then give each `item` an index which we call `i` and then write in brackets immediately after what we want to use as the index, which in this case, is our `item.id`. You will also notice that we did not have to pass a `key` to our `<ToDoItem/>` here as Svelte assigns it anyway.

# And there we have it! 🎉

We’ve looked at how we add, remove and change data, pass data in the form of props from parent to child, and send data from the child to the parent in the form of event listeners. There are, of course, lots of other little differences and quirks between React and Svelte, but hopefully the contents of this article has helped to serve as a bit of a foundation for understanding how they both handle stuff.

If you’re interested in forking the styles used in this article and want to make your own equivalent piece, please feel free to do so! 👍

# Github links to both apps:

React ToDo: https://github.com/sunil-sandhu/react-todo-2019

Svelte ToDo: https://github.com/sunil-sandhu/svelte-todo