## 6 React Design Patterns

There are numerous design patterns that are available in React.js. Here, we shortlist a few recommended React patterns that you should definitely know about when building web apps. 

1. [Functional vs. Container Components](https://www.uxpin.com/studio/blog/react-design-patterns/#h-functional-vs-container-components)
2. [Compound Components](https://www.uxpin.com/studio/blog/react-design-patterns/#h-compound-components)
3. [Conditional Rendering](https://www.uxpin.com/studio/blog/react-design-patterns/#h-conditional-rendering)
4. [Render Props](https://www.uxpin.com/studio/blog/react-design-patterns/#h-render-props)
5. [Controlled Components](https://www.uxpin.com/studio/blog/react-design-patterns/#h-controlled-components)
6. [React Hooks](https://www.uxpin.com/studio/blog/react-design-patterns/#h-react-hooks)
7. [Higher-Order Component Pattern](https://www.uxpin.com/studio/blog/react-design-patterns/#h-higher-order-component-pattern)

### Functional vs Container Components

Components can be of two types, namely, stateful and stateless components. The difference between both is merely the presence of state or lack thereof. 

What is the state? It’s simply the data that is imported into a component. Typically data is fetched from the database.

![03 1 1](https://studio.uxpincdn.com/studio/wp-content/uploads/2020/12/03_1-1.png.webp)

In stateless components, you can not reach `this.stat`e inside it.

Stateless components are also called functional components or presentational components. In React, such components always render the same thing or only what is passed to them via props. 

Your aim, as a developer, should be to create stateless components even if there is no immediate scenario in which you would have to reuse that particular component. 

Most often developers figure out whether a component needs to have a state or not once they start writing the code as it is not always clear beforehand.

For a hierarchy of components, the best practice is to let parent components keep as much state as possible and make stateless child components. Data can be passed down via props. Speaking of children and parents, we can go to the next React design pattern.

### Compound Components

When React developers have two or more components that work together, more likely one is the parent while the rest are children. But did you know that you can make them share states and handle logic together?

That’s what the compound component React pattern is all about. The compound components API shows relationships between components and allows them to communicate in a flexible way.

If you want to know more about it, read this article by LogRocket about [understanding React compound components](https://blog.logrocket.com/understanding-react-compound-components/).

### Conditional Rendering

Conditions are the foremost tool in the arsenal of any software developer. 

In the process of writing React components, the need often arises to render a certain JSX code based on the state. This is achieved through conditional rendering.

![04 1 1](https://studio.uxpincdn.com/studio/wp-content/uploads/2020/12/04_1-1.png.webp)

Conditional rendering is very useful as it allows you to create distinct components based on your needs and then render only the ones that are required by the application.

For instance, conditional rendering can be used to display different messages to the user based on the login status of the user. The message will be subject to the value of the prop `isLoggedIn`.

### Render Props

We discussed how design patterns are there to solve common problems. Render props are available in React to help us solve the problem of logic repetition. 

According to [official React documentation](https://reactjs.org/docs/render-props.html), render props are defined as a ‘*technique for sharing code between React components using a prop whose value is a function*’.

Render props prove really handy as they allow us to share the same state across different components. Instead of hardcoding the logic inside each component, you can use a function prop to determine what to render.

Some popular libraries that make use of render props include Formik, React Router, and Downshift.

### Controlled Components

Web forms are a common requirement in a large number of applications and controlled components are React’s answer to handling form state.

The controlled component takes the state through props. It can notify any changes by means of callbacks like `onChange`. 

Parent components can control it by handling the callback and managing its own state meanwhile, the new values are passed to the controlled component as props.

By default React forms have support for both controlled and uncontrolled components. It is highly recommended that you use controlled components. 

The following code snippet shows a controlled component.

```
<input type = "text" value = {value} onChange = {handleChange} />
```

### React Hooks

Hooks are a relatively new addition to React and were introduced in React 16.8. 

These functions allow developers to use React without classes. There are a number of different pre-built hooks available like the Effect Hook ( `useEffect` ) and the State Hook. 

For a complete list of available hooks, you can visit the [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html).

Apart from the pre-built hooks in React, you can also create your own hooks. This allows you to extract the component logic and create reusable functions.

Hooks are a welcome addition to React and the developer community really appreciated this new addition with great enthusiasm.

However, it must be kept in mind that sometimes hooks can become a little tricky to work with when the arguments are objects, arrays, or functions. This can become somewhat confusing.

On the other hand, custom hooks are easy and simple to use and they also provide immense benefits to the developer.

### Higher-Order Component Pattern

When it comes to more advanced React patterns, there’s higher-order component pattern, referred to as HOC. It’s applied whenever React developer wants to reuse logic within application.

HOC takes a component as an argument and when it returns it, it adds data and functionality to the component.

For instance, when using React with Redux, you can pass the component through connect function and it will get injected with data from the Redux store. The values that you get will be passed as Props.

HOC is not a part of the core React API. It’s a JavaScript function. Nonetheless, it is in line with the nature of React functional components, that’s composition over inheritance.

## Use Most Common React Design Patterns

React has proven to be a highly popular library. The community is among the fastest-growing developer communities online.

You will also find lots of useful web development resources available online that make it easy to learn react.js and adapt to it.

The power of [React](https://www.uxpin.com/studio/blog/vue-react-angular-framework-comparison/) is due to its amazing features and the robust architecture that it offers. One of the most prominent and widely loved features of React is its design patterns.

[Design patterns](https://www.uxpin.com/studio/blog/great-artists-reuse-reusable-patterns-product-design/) are in fact what gives this library its extraordinary practicality and usefulness. They make code optimization and maintenance easier.

They allow developers to create apps that are flexible in nature, deliver better performance, and produce a codebase that is easier to maintain.

We have discussed a few popular React design patterns like stateless functions, render props, controlled components, conditional rendering, and react hooks. 

However, it must be noted that react design patterns are not just limited to these patterns and there are several different design patterns that you can implement. Once you get familiar with the usage of the common design patterns, it will become easier to graduate to others. 

## Why You Should Follow React Design Patterns?

Let us first briefly recap the role that design patterns play. Simply put, design patterns are repeatable solutions to commonly occurring problems in software development.

They serve as a basic template upon which you can build up the program’s functionality according to the given requirements. 

The term ‘design pattern’ is not to be confused with a ‘[design system](https://www.uxpin.com/studio/blog/design-systems-vs-pattern-libraries-vs-style-guides-whats-difference/)’. We have discussed more design systems in a separate article.

![designops picking tools care](https://studio.uxpincdn.com/studio/wp-content/uploads/2022/05/designops-picking-tools-care.png.webp)

Design patterns not only speed up the development process but also make the code easier to read and to maintain. 

Some common examples of design patterns include the Singleton pattern and the Gang-of-Four pattern.

In software development, design patterns are associated with two common roles.

1. Design patterns offer a common platform to developers.
2. Design patterns ensure that React best practices are applied.

Let’s look at them closer.

### Role #1: Offer a common platform to developers

Design patterns provide standard terminology and solutions to known problems. Let us take the example of the Singleton pattern that we mentioned above. 

![img](https://studio.uxpincdn.com/studio/wp-content/uploads/2020/12/01_1-1.png.webp)

This pattern postulates the use of a single object. Developers implementing this pattern can easily communicate to other developers that a particular program follows the singleton pattern and they will understand what this means. 

### Role #2: Ensure that React best practices are applied

Design patterns have been created as a result of extensive research and testing. They not only allow developers to become easily accustomed to the development environment but also ensure that the best practices are being followed.

This results in fewer errors and saves time during debugging and figuring out problems that could have been easily avoided if an appropriate design pattern had been implemented.

Like every other good programming library, React makes extensive use of design patterns to provide developers a powerful tool. By properly following the React philosophy, developers can produce some extraordinary applications. 

Now that you have an understanding of design patterns. Let us move on to some of the most widely used design patterns available in React.js. 

To learn how you can effectively reuse design patterns, check out our article on [how great artists reuse](https://www.uxpin.com/studio/blog/great-artists-reuse-reusable-patterns-product-design/). 

## The Functioning of Reactjs

You can install react using the create-react-app available on [Github](https://www.uxpin.com/studio/blog/design-system-glossary/). Using [npm](https://www.uxpin.com/studio/blog/what-is-npm/) you can add all the other dependencies.

React.js makes use of JSX. This is a syntax extension of JavaScript. It comes with the full power of [JavaScript](https://www.uxpin.com/studio/blog/expressions-javascript-prototyping/) and provides us with what is termed as React ‘elements’.

Although it is not mandatory to use JSX, it is the preferred method due to the helpful visual aid and styling options that it provides. It also provides useful error messages and warnings.

The core philosophy that React.js follows is that of reusable react components. You will notice that this component-based approach can be leveraged to build rich user interfaces for web applications.

![02 1 1](https://studio.uxpincdn.com/studio/wp-content/uploads/2020/12/02_1-1.png.webp)

These React components can be considered as a small system in itself. Each component has its own state, input as well as output. 

The input of a component is taken in the form of props. The component may be considered as a black box. Each having its own state and lifecycle. Components are easy to compose.

The final react app consists of a highly maintainable code.

## Prototype with React components with UXPin Merge

Capturing the true essence of React application development can be made easier by the use of the right technology. UXPin Merge, you can import React code components to UXPin and use them to build powerful prototypes.

With Merge, [companies like PayPal](https://www.uxpin.com/studio/blog/paypal-scaled-design-process-uxpin-merge/) easily solved DesignOps challenges. Request access and see how Merge can help you use your dev’s React library at the prototyping stage.