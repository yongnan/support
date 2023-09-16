# My-React-Projects

My works for React-Projects book

# Ch3. Build a Dynamic Project Management Board with React and Suspense

will be covered in this chapter:

- React Suspense and code-splitting
- Using HOC (**Higher-Order Components**)
- Dynamic data flow

## Initialize GIT

```
cd ch03
git checkout --orphan ch03
git rm -rf .    
rm .gitignore
touch .gitignore
echo 'node_modules/' .gitignore 
git add .gitignore   
git commit -a -m "Initial Commit"   
git push origin ch03
```

## Create app

```bash
npx create-react-app
```

```bash
npm install styled-components
```

```bash
npm start
```

http://localhost:3000

```bash
npm run build
serve -s build
```

http://localhost:5000.

*** Initial code could download from https://github.com/PacktPublishing/React-Projects/tree/ch3-initial

 the project tree:

```
project-management-board
|-- assets
    |-- data.json
|-- node_modules
|-- public
    |-- favicon.ico
    |-- index.html
    |-- manifest.json
|-- src
    |-- components
        |-- Header
            |-- Header.js
        |-- Lane
            |-- Lane.js
    |-- containers
        |-- App.js
        |-- Board.js
    |-- index.js
    |-- serviceWorker.js
.gitignore
package.json
```

## Creating a project management board application

### initial state of code

### Handling the data flow

we will use React `Suspense` and `memo`. 

`Suspense`  ,  access the React lazy API to dynamically load components

`memo` ,  control which components should rerender when their props change.

#### Loading and displaying the data

update `Board.js`:

```JavaScript
...
class Board extends Component {
+ constructor() {
+   super();
+   this.state = {
+     data: [],
+     loading: true,
+     error: '',
+   }
+ }

+ async componentDidMount() {
+   try {
+     const tickets = await fetch('../../assets/data.json');
+     const ticketsJSON = await tickets.json();

+     if (ticketsJSON) {
+       this.setState({
+         data: ticketsJSON,
+         loading: false,
+       });
+     }
+   } catch(error) {
+     this.setState({
+      loading: false,
+      error: error.message,
+    });
+   }
+ }

  render() {
    ...
  }
  ...
```

1. Now, we can distribute the tickets over the corresponding lanes:

```javascript
...
class Board extends Component {
  ...
  render() {
+   const { data, loading, error } = this.state;

    const lanes = [
      { id: 1, title: 'To Do' },
      { id: 2, title: 'In Progress' },
      { id: 3, title: 'Review' },
      { id: 4, title: 'Done' },
    ];

    return (
      <BoardWrapper>
        {lanes.map(lane =>
          <Lane
            key={lane.id}
            title={lane.title}
+           loading={loading}
+           error={error}
+           tickets={data.filter(ticket => ticket.lane === 
            lane.id)}
          />
        )}
      </BoardWrapper>
    );
  }
}
...
```

changes to the `Lane` component:

```
import React from 'react';
import styled from 'styled-components';
+ import Ticket from '../Ticket/Ticket';

...

+ const TicketsWrapper = styled.div`
+  padding: 5%;
+ `;

+ const Alert = styled.div`
+  text-align: center;
+ `;

- const Lane = ({ title }) => (
+ const Lane = ({ tickets, loading, error, title }) => (
    <LaneWrapper>
      <Title>{title}</Title>
+     {(loading || error) && <Alert>{loading ? 'Loading...' : 
       error}</Alert>}
+     <TicketsWrapper>
+       {tickets.map(ticket => <Ticket key={ticket.id} 
         ticket={ticket} />)}
+     </TicketsWrapper>
    </LaneWrapper>
);
```

Then, create new file `src/components/Ticket/Ticket.js`:

```
import React from 'react';
import styled from 'styled-components';

const TicketWrapper = styled.div`
  background: darkGray;
  padding: 20px;
  border-radius: 20px;

  &:not(:last-child) {
    margin-bottom: 5%;
  }
`;

const Title = styled.h3`
  width: 100%;
  margin: 0px;
`;

const Body = styled.p`
  width: 100%;
`;

const Ticket = ({ ticket }) => (
  <TicketWrapper>
    <Title>{ticket.title}</Title>
    <Body>{ticket.body}</Body>
  </TicketWrapper>
);

export default Ticket;
```

http://localhost:3000

<img src="/Users/yongnan/codes/github/yncbooks/My-React-Projects/ch03/assets/ch0301.png" alt="ch0301" style="zoom:20%;" />

### Getting started with HOC

*"A HOC is a function that takes a component and returns a new component."*

#### Creating HOC

To create the HOC, place a new file `src/withDataFetching.js`:

```
 import React from 'react';

+ export default function withDataFetching(WrappedComponent) {
+   return class extends React.Component {

+ }
```

add the constructor component, which has almost the same structure as the Board component:

```
...

export default function withDataFetching(WrappedComponent) {
  return class extends React.Component {
+   constructor(props) {
+     super(props);
+     this.state = {
+       data: [],
+       loading: true,
+       error: '',
+     };
+   }
...
```

Add data fetching function:

```
export default function withDataFetching(WrappedComponent) {
  return class extends React.Component {

  ...

+ async componentDidMount() {
+   try {
+     const data = await fetch(this.props.dataSource);
+     const dataJSON = await data.json();

+     if (dataJSON) {
+       this.setState({
+         data: dataJSON,
+         loading: false,
+       });
+     }
+   } catch(error) {
+     this.setState({
+       loading: false,
+       error: error.message,
+     });
+   }
+ }

 ...
```

return the WrappedComponent that was inserted into the function and pass the data, loading, and error state as props:

```
export default function withDataFetching(WrappedComponent) {
  return class extends React.Component {

    ...

+   render() {
+     const { data, loading, error } = this.state;

+     return (
+       <WrappedComponent 
+         data={data} 
+         loading={loading} 
+         error={error}
+         {...this.props} 
+       />
+     );
+   }
  };
}
```

refactor our `Board` component into a function component:

1. Import the HOC from the `src/withDataFetching.js` file:

```
import React, { Component } from 'react';
import styled from 'styled-components';
+ import withDataFetching from '../withDataFetching';
import Lane from '../components/Lane/Lane';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

...
```

 delete the entire class component, that is, Board, from this file and create a new function component that returns the JSX

```
import React, { Component } from 'react';
import styled from 'styled-components';
import withDataFetching from '../withDataFetching';
import Lane from '../components/Lane/Lane';

const BoardWrapper = ...;

+ const Board = ({ lanes, loading, error, data }) => (
+  <BoardWrapper>
+    {lanes.map(lane =>
+      <Lane
+        key={lane.id}
+        title={lane.title}
+        loading={loading}
+        error={error}
+        tickets={data.filter(ticket => ticket.lane === lane.id)}
+      />
+    )}
+  </BoardWrapper>
+ );
...
```

Finally, export the function component along with the HOC function:

```
...
const Board = ({ lanes, loading, error, data }) => (
  <BoardWrapper>
    {boards.map(lane =>
      <Lane
        key={lane.id}
        title={lane.title}
        loading={loading}
        error={error}
        tickets={data.filter(ticket => ticket.lane === lane.id)}
      />
    )}
  </BoardWrapper>
);

- export default Board;
+ export default withDataFetching(Board);
```

update `App`:

```
...

class App extends Component {
  render() {
+   const lanes = [
+     { id: 1, title: 'To Do' },
+     { id: 2, title: 'In Progress' },
+     { id: 3, title: 'Review' },
+     { id: 4, title: 'Done' },
+   ]

    return (
        <>
          <GlobalStyle />
            <AppWrapper>
            <Header />
-           <Board />
+           <Board lanes={lanes} dataSource={'../../assets/data.json'}/>
          </AppWrapper>
        </>
    );
  }
}
```

Finally, we can see the Board component being rendered by the HOC in the browser. 

#### Using the HOC

Create another HOC component:

1. new file `src/containers/Ticket.js`:

   ```
   import React from 'react';
   import styled from 'styled-components';
   import withDataFetching from '../withDataFetching';
   import Ticket from '../components/Ticket/Ticket';
   
   const TicketsWrapper = styled.div`
     display: flex;
     justify-content: space-between;
     flex-direction: row;
     margin: 5%;
   
     @media (max-width: 768px) {
       flex-direction: column;
     }
   `;
   
   const Alert = styled.div`
       text-align: center;
   `;
   
   const Tickets = ({ loading, data, error }) => (
     <TicketsWrapper>
       {(loading || error) && <Alert>{loading ? 'Loading...' : 
        error}</Alert>}
       {data.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}
     </TicketsWrapper>
   );
   
   export default withDataFetching(Tickets);
   ```

2. update 'App':

   ```
   import React, { Component } from 'react';
   import styled, { createGlobalStyle } from 'styled-components';
   import Board from './Board';
   + import Tickets from './Tickets';
   import Header from '../components/Header/Header';
   
   ...
   
   class App extends Component {
     render() {
       ...
       return (
           <>
             <GlobalStyle />
               <AppWrapper>
               <Header />
               <Board boards={boards} 
                dataSource={'../../assets/data.json'} />
   +           <Tickets dataSource={'../../assets/data.json'} />                    
               </AppWrapper>
          </>
       );
     }
   }
   
   export default App;
   ```

Fixing `Tickets` margins:

1. Pass a new prop called marginRight to the `Tickets` components :

```
...

const Tickets = ({ loading, data, error }) => (
  <TicketsWrapper>
    {(loading || error) && <Alert>{loading ? 'Loading...' : 
      error}</Alert>}
-   {data.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}
+   {data.map(ticket => <Ticket key={ticket.id} marginRight ticket={ticket} />)}
  </TicketsWrapper>
);

export default withDataFetching(Tickets);
```

1. In the Ticket component, we need to destructure this prop and pass it to the TicketWrapper we created with styled-components:

```
import React from 'react';
import styled from 'styled-components';

const TicketWrapper = styled.div`
  background: darkGray;
  padding: 20px;
  border-radius: 20px;

  &:not(:last-child) {
    margin-bottom: 5%;
+   margin-right: ${props => !!props.marginRight ? '1%' : '0'};
  }
`;

...

- const Ticket = ({ ticket }) => (
+ const Ticket = ({ marginRight, ticket }) => (
-   <TicketWrapper>
+   <TicketWrapper marginRight={marginRight}>
      <Title>{ticket.title}</Title>
      <Body>{ticket.body}</Body>
    </TicketWrapper>
);

export default Ticket;
```

naming the HOC components:

1. update `WithDataFetching`:

   ```
   import React from 'react';
   
   export default function withDataFetching(WrappedComponent) {
   - return class extends React.Component {
   + class WithDataFetching extends React.Component {
   ...
   ```

2. Insert name:

   ```
   import React from 'react';
   
   export default function withDataFetching(WrappedComponent) {
     class WithDataFetching extends React.Component {
     	constructor(props){
     		...
     		+ WithDataFetching.displayName = `WithDataFetching(${this.props.name})`;
     	}
       
       ...
   
       render() {
         const { data, loading, error } = this.state;
   
         return (
           <WrappedComponent 
             data={data} 
             loading={loading} 
             error={error} 
             {...this.props} 
           />
         );
       }
     };
   
   + return WithDataFetching;
   }
   ```

http://localhost:5000

<img src="/Users/yongnan/codes/github/yncbooks/My-React-Projects/ch03/assets/ch0302.png" alt="ch0302" style="zoom:35%;" />

### Making the board dynamic

HTML5 Drag and Drop API,  it uses drag events. onDragStart, onDragOver, and onDrop, 

 These events should be placed on both the `Lane` and the` Ticket` components. 

1. Change `Board`:

   ```
   ...
   
   - const Board = ({ lanes, loading, data, error }) => (
   + class Board extends React.Component {
   +   render() {
   +     const { lanes, loading, data, error } = this.props;
       
   +     return (
           <BoardWrapper>
             {lanes.map(lane =>
               <Lane
                 key={lane.id}
                 title={lane.title}
                 loading={loading}
                 error={error}
                 tickets={data.filter(ticket => ticket.lane ===  
                 lane.id)}
               />
             )}
           </BoardWrapper>
         );
   +   }
   + }
   ```

2. add the initial value for the tickets to the state

   ```
   ...
   class Board extends React.Component {
   + constructor() {
   +   super();
   +   this.state = {
   +     tickets: [],
   +   };
   + }
   
     render() {
     ...
   ```

3. to check whether the props for these components have changed. 

    ```
    ...
    
    class Board extends React.Component {
      constructor() {
        super()
        this.state = {
          tickets: [],
        };
      }
    
    + componentDidUpdate(prevProps) {
    +   if (prevProps.data !== this.props.data) {
    +     this.setState({ tickets: this.props.data });
    +   }
    + }
    
      render() {
      ...
    ```

4. Finally, show the tickets from the state:

    ```
    ...  
    render() {
    -   const { lanes, data, loading, error } = this.props;  
    +   const { lanes, loading, error } = this.props;
    
        return (
          <BoardWrapper>
            {lanes.map(lane =>
              <Lane
                key={lane.id}
                title={lane.title}
                loading={loading}
                error={error}
    -           tickets={data.filter(ticket => ticket.lane === 
                lane.id)}
    +           tickets={this.state.tickets.filter(ticket => 
                ticket.lane === lane.id)}
              />
            )}
          </BoardWrapper>
        );
      }
    }
    
    export default withDataFetching(Board);
    ```

Let's add the functions that respond to the drop events, which need to be sent to the `Lane` and `Ticket` components:

1. adding the event handler function for the onDragStart event to the `Board`:

```
...
class Board extends React.Component {
  constructor() {
	  ...
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
        this.setState({ tickets: this.props.data });
    }
  }

+ onDragStart = (e, id) => {
+   e.dataTransfer.setData('id', id);
+ };

  render() {
  ...
  return (
      <BoardWrapper>
        {lanes.map(lane =>
          <Lane
            key={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
+           onDragStart={this.onDragStart}
            tickets={this.state.tickets.filter(ticket => 
            ticket.lane === lane.id)}
          />
        )}
      </BoardWrapper>
    );
    ...
```

In the `Lane` component, we need to pass this event handler function to the `Ticket` component:

```
...
- const Lane = ({ tickets, loading, error, title }) => (
+ const Lane = ({ tickets, loading, error, onDragStart, title }) => (
  <LaneWrapper>
    <Title>{title}</Title>
    {(loading || error) && <Alert>{loading ? 'Loading...' : 
     error}</Alert>}
    <TicketsWrapper>
-     {tickets.map(ticket => <Ticket key={ticket.id} 
       ticket={ticket} />)}
+     {tickets.map(ticket => <Ticket key={ticket.id} 
       onDragStart={onDragStart} ticket={ticket} />)}
    </TicketsWrapper>
  </LaneWrapper>
);

export default Lane;
```

Now, we can invoke this function in the `Ticket` component:

```
...
- const Ticket = ({ marginRight, ticket }) => (
+ const Ticket = ({ marginRight, onDragStart, ticket }) => (
  <TicketWrapper
+   draggable
+   onDragStart={e => onDragStart && onDragStart(e, ticket.id)}
    marginRight={marginRight}
  >
    <Title>{ticket.title}</Title>
    <Body>{ticket.body}</Body>
  </TicketWrapper>
);

export default Ticket;
```

http://localhost:3000

<img src="/Users/yongnan/codes/github/yncbooks/My-React-Projects/ch03/assets/ch0303.png" alt="ch0303" style="zoom:100%;" />

 we should be able to see each ticket can be dragged around.

Let's implement the onDragOver and onDrop events as well:

update `Board`:

```
...

+  onDragOver = e => {
+   e.preventDefault();
+ };
 
 render() {
    const { lanes, loading, error } = this.props;

    return (
      <BoardWrapper>
        {lanes.map(lane =>
          <Lane
            key={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            onDragStart={this.onDragStart}
+           onDragOver={this.onDragOver}
            tickets={this.state.tickets.filter(ticket => 
            ticket.lane === lane.id)}
          />
        )}
      </BoardWrapper>
    );
  }
}
```

onDragOver event on the `Lane` component:

```
...
- const Lane = ({ tickets, loading, error, title }) => (
+ const Lane = ({ tickets, loading, error, onDragOver, title }) => (
-   <LaneWrapper>
+   <LaneWrapper
+     onDragOver={onDragOver}
+   >
      <Title>{title}</Title>
      {(loading || error) && <Alert>{loading ? 'Loading...' : 
       error}</Alert>}
      <TicketsWrapper>
        {tickets.map(ticket => <Ticket onDragStart={onDragStart}   
         ticket={ticket} />)}
      </TicketsWrapper>
    </LaneWrapper>
);
...
```

onDrop event on the `Board` component :

```
...  
+  onDrop = (e, laneId) => {
+   const id = e.dataTransfer.getData('id');
+
+   const tickets = this.state.tickets.filter(ticket => {
+     if (ticket.id === parseInt(id)) {
+       ticket.lane = laneId;
+     }
+     return ticket;
+   });
+
+   this.setState({
+     ...this.state,
+     tickets,
+   });
+ };

  render() {
    const { lanes, loading, error } = this.props;

    return (
      <BoardWrapper>
        {lanes.map(lane =>
          <Lane
            key={lane.id}
+           laneId={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
+           onDrop={this.onDrop}
            tickets={this.state.tickets.filter(ticket => ticket.lane === 
            lane.id)}
          />
        )}
      </BoardWrapper>
    );
  }
}
...
```

onDrop event to the `Lane` component:

```
...
- const Lane = ({ tickets, loading, error, onDragStart, onDragOver, title }) => (
+ const Lane = ({ laneId, tickets, loading, error, onDragStart, onDragOver, onDrop, title }) => (
  <LaneWrapper
    onDragOver={e => onDragOver(e)}
+   onDrop={e => onDrop(e, laneId)}
  >
    <Title>{title}</Title>
    {(loading || error) && <Alert>{loading ? 'Loading...' : error}</Alert>}
    <TicketsWrapper>
      { tickets.map(ticket => <Ticket onDragStart={onDragStart} 
        ticket={ticket} />)}
    </TicketsWrapper>
  </LaneWrapper>
);
...
```

# Summary

In this chapter, you created a project management board that lets you move and drag and drop tickets from one lane to another using React Suspense and the HTML5 Drag and Drop API. The data flow of this application is handled using local state and life cycles and determines which tickets are displayed in the different lanes. This chapter also introduced the advanced React pattern of **Higher-Order Components**(**HOCs**). With HOCs, you can reuse state logic from class components across your applications.

This advanced pattern will be also be used in the next chapter, which will handle routing and **Server-Side Rendering** (**SSR**) in React applications. Have you ever tried using Stack Overflow to find a solution to a programming issue you once had? I have!

# Futher reading

- Drag and Drop API: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API.
- HOC: https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750.
- DataTransfer: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer.
- React DnD: https://github.com/react-dnd/react-dnd.