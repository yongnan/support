import React from "react";
import { render } from "react-dom";
import MyComponent from "./MyComponent";

const myHeader = <h1>My Header</h1>;
const myContent = <p>My Content</p>;

render(
  <section>
    <MyComponent {...{ myHeader, myContent }} />
    <MyComponent myHeader="My Header2" {...{ myContent }} />
    <MyComponent {...{ myHeader }} myContent="My Content3" />
    <MyComponent
      {...{ myHeader }}
      myContent={[myContent, myContent, myContent]}
    />
  </section>,
  document.getElementById("root")
);
