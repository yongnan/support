# My-React-Projects

My works for React-Projects book

# Ch2. Creating a Progressive Web Application with Reusable React Components

- Creating a Progressive Web App
- Building reusable React components
- Styling in React with styled-components

## Code structure

```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── GitHub-Mark-Light-64px.png
    ├── components
    │   ├── App
    │   │   └── Header.js
    │   ├── List
    │   │   └── List.js
    │   └── shared
    │       └── Link.js
    ├── containers
    │   ├── App.js
    │   └── Profile.js
    ├── index.js
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js

```



## Creating a PWA with Create React App

- the React core team introduced a starter kit known as Create React App 
- A PWA 
  - is usually faster and more reliable than regular web applications
  - offline/cache-first approach
  - users can add our application to the home screen like a native application

### Installing Create React App

should install it globally so that the package is available everywhere:

```bash
npm install -g create-react-app
```

 create a new project

```bash
npm init react-app github-portfolio
or
npx create-react-app github-portfolio
```

```bash
npm start  
```

then visit http://localhost:3000/

- react-scripts supports hot reloading by default, 

- run the build script, a new directory called build will be created in the projects' root directory, where the minified bundle of our application can be found.

### Creating a PWA

to supports PWA, in `src/index.js` register the serviceWorker:

```
// Learn more about service workers: http://bit.ly/CRA-PWA
- serviceWorker.unregister();
+ serviceWorker.register();
```

- react-scripts uses a package called `workbox-webpack-plugin`, which works together with webpack 4 to serve our application as a PWA.
- `manifest.json` in public is this configuration file.

`mnifest.json` breakdown:

- "shot_name": up to 12 characters, and will be shown underneath the application icon on the user's home screen
- "name": up to 45 characters, as identifier od the application, and can be seen during the process of adding the application to the home screen.
- "icon": seen when add application to the home screen.
  - Only files that are placed in the public directory can be referred to from this file.
- `internalization`:  serves content in different languages. 
- `versioning`: if there are multiple versions of our application in production.

### Serving the PWA

```
npm run build 
```

bundle that's stored inside the `build` directory

as npm build suggested and run :

```
npm install -g serve

serve -s build
```

then visit http://localhost:5000/

## Building reusable React components

### Structuring our application

- create two new directories calledc`components` and `containers` inside the src directory. 
- move `App.css`, `App.js` to `container` directory
- delete `App.test.js`, since testing is not cover here.

change the location of the import for the App component in src/index.js:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
- import App from './App';
+ import App from './containers/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
```

Do the same for the location of the React logo in src/containers/App.js:

```
import React, { Component } from 'react';
- import logo from './logo.svg';
+ import logo from '../logo.svg';
import './App.css';

class App extends Component {

...
```

For `App.js`,  let's change that header element into a React component:

1. create a new directory called `App` inside the `components` directory

   copy all contents from App.css into new file `Header.css` (inside the `components/Header`)

   ```
   .App-logo {
     height: 40vmin;
     pointer-events: none;
   }
   
   .App-header {
     background-color: #282c34;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     font-size: calc(10px + 2vmin);
     color: white;
   }
   
   .App-link {
     color: #61dafb;
   }
   
   @keyframes App-logo-spin {
     from {
       transform: rotate(0deg);
     }
     to {
       transform: rotate(360deg);
     }
   }
   ```

3. Create new file 'Header.js' inside this directory:

   ```
   import React from 'react';
   import './Header.css';
   
   const Header = ({logo}) => (
    <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
    </header>
   );
   
   export default Header;
   ```

3. Import `Header` component inside  `App` component:

   ```
   import React, { Component } from 'react';
   + import Header from '../components/App/Header';
   import logo from '../logo.svg';
   import './App.css';
   
   class App extends Component {
    render() {
      return (
        <div className='App'>
   -      <header className='App-header'>
   -        <img src={logo} className='App-logo' alt='logo' />
   -        <p>Edit <code>src/App.js</code> and save to reload.</p>
   -        <a
   -          className='App-link'
   -          href='https://reactjs.org'
   -          target='_blank'
   -          rel='noopener noreferrer'
   -        >
   -          Learn React
   -        </a>
   -      </header>
   +      <Header />
        </div>
      );
    }
   }
   
   export default App;
   ```

When we visit our project in the browser again, we'll see an error saying that the value for the logo is undefined.

1. Send the logo constant as a prop to the Header component in src/container/App.js:

   ```
   ...
   class App extends Component {
    render() {
      return (
        <div className='App'>
   -      <Header />
   +      <Header logo={logo} />
        </div>
      );
    }
   }
   
   export default App;
   ```

The Header component is still divided into multiple elements

1. create a new directory called `shared` inside the `components` directory, then create new file 'Link.js' in it:

   ```
   import React from 'react';
   import './Link.css';
   
   const Link = ({ url, title }) => (
     <a
       className='App-link'
       href={url}
       target='_blank'
       rel='noopener noreferrer'
     >
       {title}
     </a>
   );
   
   export default Link;
   ```

2. Delete the styling for the App-link class from src/components/App/Header.css and place this inside a file called Link.css:

   ```
   .App-link {
       color: #61dafb;
   }
   ```

3. Import this Link component and place it inside the Header component in src/components/App/Header.js:

   ```
   import React from 'react';
   + import Link from '../shared/Link';
   
   const Header = ({ logo }) => (
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <p>Edit <code>src/App.js</code> and save to reload.</p>
   -  <a
   -    className='App-link'
   -    href='https://reactjs.org'
   -    target='_blank'
   -    rel='noopener noreferrer'
   -  >
   -    Learn React
   -  </a>
   +  <Link url='https://reactjs.org' title='Learn React' />
    </header>
   );
   
   export default Header;
   ```

### Reusing components in React

#### Retrieve data from github api

We can retrieve our public GitHub information from GitHub

```
curl 'https://api.github.com/users/username'
```

```
{
  "login": "octocat",
  "id": 1,
  "node_id": "MDQ6VXNlcjE=",
  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  ...
  "repos_url": "https://api.github.com/users/octocat/repos",
	...
	"name": "monalisa octocat",
  "company": "GitHub",
  ...
  "location": "San Francisco",
  "email": "octocat@github.com",
  ...
  "bio": "There once was...",
  ...
}
```

Multiple fields in the JSON output are highlighted since these are the fields we'll use in the application. These are avatar_url, html_url, repos_url, name, company, location, email, and bio

1. create a new container `Profile` in `src/containers/Profile.js`:

   ```
   import React, { Component } from 'react';
   
   class Profile extends Component {
     constructor() {
       super();
       this.state = {
         data: {},
         loading: true,
       }
     }
     
     async componentDidMount() {
       const profile = await fetch('https://api.github.com/users/octocat');
       const profileJSON = await profile.json();
   
       if (profileJSON) {
         this.setState({
           data: profileJSON,
           loading: false,
         })
       }
     }
   
     render() {
       return (
         <div></div>
       );
     }
   }
   
   export default Profile;
   ```

    import this new component into the `App` component:

   ```
   import React, { Component } from 'react';
   + import Profile from './Profile';
   import Header from '../components/App/Header';
   import logo from '../logo.svg';
   import './App.css';
   
   class App extends Component {
     render() {
       return (
         <div className='App'>
           <Header logo={logo} />
   +       <Profile />
         </div>
       );
     }
   }
   
   export default App;
   ```

2. Run app & Open browser, the new Profile component isn't visible yet.  

   So update `scr/components/App/Header.css`:

   ```
   .App-logo {
   - height: 40vmin;
   + height: 64px;
     pointer-events: none;
   }
   
   .App-header {
     background-color: #282c34;
   - min-height: 100vh;
   + height: 100%;
   ```

3. There should be enough free space on our page to display the Profile component, so we can edit the `scr/containers/Profile.js`:

   ```
   render() {
   +   const { data, loading } = this.state;
   
   +   if (loading) {
   +       return <div>Loading...</div>;
   +   }
   
       return (
         <div>
   +       <ul>
   +         <li>avatar_url: {data.avatar_url}</li>
   +         <li>html_url: {data.html_url}</li>
   +         <li>repos_url: {data.repos_url}</li>
   +         <li>name: {data.name}</li>
   +         <li>company: {data.company}</li>
   +         <li>location: {data.location}</li>
   +         <li>email: {data.email}</li>
   +         <li>bio: {data.bio}</li>
   +       </ul>
         </div>
   ```

visited our project in the browser, we will see a bulleted list of the GitHub information being displayed.

Since this doesn't look very pretty and the header doesn't match with the content of the page, let's make some changes to the styling files for these two components, 

1. change the `Header` component:

   ```
   import React from 'react';
   - import logo from '../logo.svg';
   + import logo from '../../GitHub-Mark-Light-64px.png';
   - import Link from '../components/Link';
   import './Header.css';
   
   - const Header = ({ logo }) => (
   + const Header = () => (
     <header className='App-header'>
       <img src={logo} className='App-logo' alt='logo' />
   -   <p>
   +   <h1>
   -     Edit <code>src/App.js</code> and save to reload.
   +     My Github Portfolio
   -   </p>
   +   </h1>
   -   <Link url='https://reactjs.org' title='Learn React' />
     </header>
   ```

change `scr/containers/Profile.js`:

```
import React, { Component } from 'react';
+ import Link from '../components/shared/Link';
+ import './Profile.css';

class Profile extends Component {

  ...

      return (
-       <div>
+       <div className='Profile-container'>
+         <img className='Profile-avatar' src={data.avatar_url} alt='avatar' />
-         <ul>
-           ...
-         </ul>
+         <ul className='Profile-information'>
+           <li><strong>html_url:</strong> <Link url={data.html_url} title='Github URL' /></li>
+           <li><strong>repos_url:</strong> {data.repos_url}</li>
+           <li><strong>name:</strong> {data.name}</li>
+           <li><strong>company:</strong> {data.company}</li>
+           <li><strong>location:</strong> {data.location}</li>
+           <li><strong>email:</strong> {data.email}</li>
+           <li><strong>bio:</strong> {data.bio}</li>
+         </ul>
+      </div>
    );
  }
}

export default Profile;
```

create the `src/containers/Profile.css`:

```
.Profile-container {
  width: 50%;
  margin: 10px auto;
}

.Profile-avatar {
  width: 150px;
}

.Profile-container > ul {
 list-style: none;
 padding: 0;
 text-align: left;
}

.Profile-container > ul > li {
 display: flex;
 justify-content: space-between;
}

```

Finally, we can see that the application is starting to look like a GitHub portfolio page, with a header showing the GitHub logo icon and a title, followed by our GitHub avatar and a list of our public information.

<img src="/Users/yongnan/codes/github/yncbooks/My-React-Projects/ch02/assets/ch0201.png" alt="ch0201" style="zoom:50%;" />

To remove duplicate code in list information

1. Create a new file `src/components/List/List.js`:

```
import React from 'react';

const List = () => (
  <ul></ul>
);

export default List;
```

2.  Update `src/containers/Profile.js`

   ```
    import Link from '../components/Link/Link';
   + import List from '../components/List/List';
   ...
    if (loading) {
       return <div>Loading...</div>;
     }
   
   + const items = [
   +   { label: 'html_url', value: <Link url={data.html_url} title='Github URL' /> },
   +   { label: 'repos_url', value: data.repos_url },
   +   { label: 'name', value: data.name},
   +   { label: 'company', value: data.company },
   +   { label: 'location', value: data.location },
   +   { label: 'email', value: data.email },
   +   { label: 'bio', value: data.bio }
   + ]
   ...
    return (
       <div className='Profile-container'>
         <img className='Profile-avatar' src={data.avatar_url} alt='avatar' />
   -     <ul>
   -       <li><strong>html_url:</strong> <Link url={data.html_url} title='Github URL' /></li>
   -       <li><strong>repos_url:</strong> {data.repos_url}</li>
   -       <li><strong>name:</strong> {data.name}</li>
   -       <li><strong>company:</strong> {data.company}</li>
   -       <li><strong>location:</strong> {data.location}</li>
   -       <li><strong>email:</strong> {data.email}</li>
   -       <li><strong>bio:</strong> {data.bio}</li>
   -     </ul>
   +     <List items={items} />
       </div>
      );
   ```

3. Update `List.js`:

   ```
   - const List = () => (
   + const List = ({ items }) => (
     <ul>
   +   {items.map(item =>
   +     <li key={item.label}>
   +       <strong>{item.label}</strong>{item.value}
   +     </li>
   +   )}
     </ul>
   ```

### Styling in React with styled-components

the `styled-components` package allows us to write CSS inside JavaScript (so-called **CSS-in-JS**) and create components.

```
npm install styled-components
```

 try to delete the CSS file from one of our components. 

update `Link.js`:

```
import React from 'react';
+ import styled from 'styled-components';
import './Link.css';

+ const InnerLink = styled.a`
+  color: #61dafb;
+ `;
...
```

 replace the existing <a> element with this styled component

```
import React from 'react';
import styled from 'styled-components';
- import './Link.css';

const InnerLink = styled.a`
 color: #61dafb;
`;

const Link = ({ url, title }) => (
- <a className='App-link'
+ <InnerLink
    href={url}
    target='_blank'
    rel='noopener noreferrer'
  >
    {title}
- </a>
+ </InnerLink>
);
```

to replace all the other components that import CSS files for styling,

1. `Header`:

```
import React from 'react';
+ import styled from 'styled-components';
import logo from '../../GitHub-Mark-Light-64px.png';
- import './Header.css'

+ const HeaderWrapper = styled.div`
+  background-color: #282c34;
+  height: 100%;
+  display: flex;
+  flex-direction: column;
+  align-items: center;
+  justify-content: center;
+  font-size: calc(10px + 2vmin);
+  color: white;
+ `;

+ const Logo = styled.img`
+  height: 64px;
+  pointer-events: none;
+ `;

const Header = ({ logo }) => (
- <header className='App-header'>
+ <HeaderWrapper>
    <Logo src={logo} alt='logo' />
    <h1>My Github Portfolio</h1>
- </header>
+ </HeaderWrapper>
);
```

`src/containers/App.js`:

```
import React, { Component } from 'react';
+ import styled from 'styled-components';
import Profile from './Profile';
import Header from '../components/App/Header';
- import './App.css';

+ const AppWrapper = styled.div`
+  text-align: center;
+ `;

class App extends Component {
 render() {
   return (
-    <div className="App">
+    <AppWrapper>
       <Header />
       <Profile />
-    </div>
+    </AppWrapper>
   );
  }
}
...
```

`List` component, delete `List.css`:

```
import React from 'react';
+ import styled from 'styled-components';

+ const ListWrapper = styled.ul`
+  list-style: none;
+  text-align: left;
+  padding: 0;
+ `;

+ const ListItem = styled.li`
+  display: flex;
+  justify-content: space-between;
+ `;

+ const Label = styled.span`
+  font-weight: bold;
+ `;

const List = ({ items }) => (
- <ul>
+ <ListWrapper>
    {items.map(item =>
-     <li key={item.label}>
+     <ListItem key={item.label}>
-       <strong>{item.label}</strong>{item.value}
+       <Label>{item.label}</Label>{item.value}
-     </li>
+     </ListItem>
    )}
-  </ul>
+  </ListWrapper>
);
...
```

`Profile`, delete Profile.css, an update as:

```
import React, { Component } from 'react';
+ import styled from 'styled-components';
import Link from '../components/Link/Link';
import List from '../components/List/List';
- import './Profile.css';

+ const ProfileWrapper = styled.div`
+  width: 50%;
+  margin: 10px auto;
+ `;

+ const Avatar = styled.img`
+  width: 150px;
+ `;

class Profile extends Component {
...
  return (
-   <div className='Profile-container'>
+   <ProfileWrapper>
-     <img className='Profile-avatar' src={data.avatar_url} alt='avatar' />
+     <Avatar src={data.avatar_url} alt='avatar' />
      <List items={items} />
-   </div>
+   </ProfileWrapper>
  );
 }
}
...
```

for index.css, to use `createGlobalStyle` function from `styled-components` to add styling for the <body> 

we need to use **React Fragments** 

`App.js`:

```
import React, { Component } from 'react';
- import styled from 'styled-components';
+ import styled, { createGlobalStyle } from 'styled-components';
import Profile from './Profile';
import Header from '../components/App/Header';

+ const GlobalStyle = createGlobalStyle`
+  body {
+    margin: 0;
+    padding: 0;
+    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
+    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
+    sans-serif;
+    -webkit-font-smoothing: antialiased;
+    -moz-osx-font-smoothing: grayscale;
+  }
+ `;

...

class App extends Component {
 render() {
   return (
+   <>    
+    <GlobalStyle />
     <AppWrapper>
       <Header />
       <Profile />
     </AppWrapper>
+   </>
  );
 }
}
...
```

delete the last CSS file in the project, that is, src/index.css. 

edit `src/index.js`:

```
- import './index.css';
import App from './containers/App';
```

Now, we should be able to delete the last CSS file in the project, that is, src/index.css

### display the repositories from our Github

The last : to display the repositories on this Github Portfolio page.

1.  Load the repository list from the API endpoint and add it to state in `src/containers/Profile.js`:

   ```
   ...
   
   class Profile extends Component {
     constructor() {
       super();
       this.state = {
         data: {},
   +     repositories: [],
         loading: true,
       }
     }
   
     async componentDidMount() {
       const profile = await fetch('https://api.github.com/users/octocat');
       const profileJSON = await profile.json();
   
       if (profileJSON) {
   +     const repositories = await fetch(profileJSON.repos_url);
   +     const repositoriesJSON = await repositories.json();
   
         this.setState({
           data: profileJSON,
   +       repositories: repositoriesJSON,
           loading: false,
         })
       }
     }
   
     render() {
   -   const { data, loading } = this.state; 
   +   const { data, loading, repositories } = this.state;
   
       if (loading) {
         return <div>Loading...</div>
       }
   
       const items = [
         ...
       ];
   
    +  const projects = repositories.map(repository => ({
    +    label: repository.name,
    +    value: <Link url={repository.html_url} title='Github URL' />
    +  }));
   
   ...
   ...

     render() {

     ...
   
       const projects = repositories.map(repository => ({
         label: repository.name,
         value: <Link url={repository.html_url} title='Github URL' />
       }));
   
       return (
         <ProfileWrapper>
            <Avatar src={data.avatar_url} alt='avatar' />
   -       <List items={items} />
   +       <List title='Profile' items={items} />
   +       <List title='Projects' items={projects} />
         </ProfileWrapper>
       );
     }
   }
   
   export default Profile;
   ```
   
   changes to `src/components/List/List.js` and display the title at the top of each list.
   
   ```
   import React from 'react';
   import styled from 'styled-components';

   + const Title = styled.h2`
+  padding: 10px 0;
   +  border-bottom: 1px solid lightGrey;
   + `;
   
   ...
   
   - const List = ({ items }) => (
   + const List = ({ items, title }) => (
   +  <>
   +    <Title>{title}</Title>
        <ListWrapper>
          {items.map(item =>
            <ListItem key={item.label}>
              <Label>{item.label}</Label>{item.value}
            </ListItem>
          )}
        </ListWrapper>
   +  </>
   );
   
   ```
   
   Now that we've used Create React App and enabled the project to be set up as a PWA
   
   <img src="/Users/yongnan/codes/github/yncbooks/My-React-Projects/ch02/assets/ch0202.png" alt="ch0202" style="zoom:50%;" />

To build the project, run the following command:

```
npm run build
```

Then, serve the build version by running the following command:

```
serve -s build
```

#### Catching errors

edit `src/containers/Profile.js`:

```
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      repositories: [],
      loading: false,
+     error: '',
    }
  }
```

```
...

  async componentDidMount() {
+   try {
      const profile = await fetch('https://api.github.com/users/octocat');
      const profileJSON = await profile.json();

      if (profileJSON) {
        const repositories = await fetch(profileJSON.repos_url);
        const repositoriesJSON = await repositories.json();

       this.setState({
         data: profileJSON,
         repositories: repositoriesJSON,
         loading: false,
       });
     }
   }
+  catch(error) {
+    this.setState({
+      loading: false,
+      error: error.message,
+    });
+  }
+ }

...
```

```
...

render() {
-  const { data, loading, repositories } = this.state;
+  const { data, loading, repositories, error } = this.state;

-  if (loading) {
-    return <div>Loading...</div>;
+  if (loading || error) {
+    return <div>{loading ? 'Loading...' : error}</div>;
  }

...

export default Profile;
```

 building our application

```
npm run build
serve -s build
```

When we visit the project at http://localhost:5000 and set the application to offline mode in the Application tab inside the browser's Developer Tools, we will see a Failed to fetch message being displayed.

# Further reading

- Create React App: https://facebook.github.io/create-react-app/
- Using npx: https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
- PWA with Create React App https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
- About the manifest.json file:[ https://developers.chrome.com/apps/manifest](https://developers.chrome.com/apps/manifest)
- Styled components: https://www.styled-components.com/docs/basics