# Render Props

source: https://reactjs.org/docs/render-props.html

The term [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) refers to a technique for sharing code between React components using a prop whose value is a function.

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

# Examle

`Mouse.tsx`

```ts
import React from "react";
import { useState } from "react";

export type Mouse = {
    x: number
    y: number
}

type MouseRender = {
  render: (mouse: Mouse ) => any
}

const Mouse = ({render}: MouseRender) => {
  const[mouse, setMouse] = useState<Mouse>({x:0, y:0})

  const handleMouseMove = (event: any) => {
    setMouse({
      x: event.clientX,
      y: event.clientY
    });
  }

    return (
      <div  style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
          {render(mouse)}
      </div>
    );
}

export default Mouse
```

`MouseTracker`

```tsx
import Mouse from "./Mouse";
import Cat from "./Cat";

const MouseTracker = () => (
  <div>
    <h1>Move the mouse around!</h1>
    <Mouse render={mouse => 
      <Cat mouse={mouse} />
    }
    />
  </div>
)

export default MouseTracker
```

`App.tsx`

```
 <MouseTracker />
```

you can implement most [higher-order components](https://reactjs.org/docs/higher-order-components.html) (HOC) using a regular component with a render prop.

`withMouse.ts`

```ts
import Mouse from "./Mouse"

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
const withMouse = ({Component, ...props}: {Component: any}) => 
    <Mouse render={mouse => (
        <Component {...props} mouse={mouse} />
    )}/>

export default withMouse
```

## Using Props Other Than `render`

Although the examples above use `render`, we could just as easily use the `children` prop!

```jsx
<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>
```

The `children` prop doesn’t actually need to be named in the list of “attributes” in your JSX element. Instead, you can put it directly *inside* the element!

```jsx
<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

Since this technique is a little unusual, you’ll probably want to explicitly state that `children` should be a function in your `propTypes` when designing an API like this.

```jsx
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

Good practice:

```jsx
import Mouse from "./Mouse";
import { IMouse } from "./Mouse";
import Cat from "./Cat";

const renderTheCat = (mouse: IMouse) => 
    <Cat mouse={mouse} />

const MouseTracker = () => (
  <div>
    <h1>Move the mouse around!</h1>
    <Mouse render={renderTheCat} />
  </div>
)

export default MouseTracker
```

