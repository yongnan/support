### Adding GraphQL to a React application

 from the `client` directory 

```
npm install apollo-client apollo-link-http react-apollo graphql graphql-tag
```

- `apollo-link-http` will connect with the GraphQL server
- `react-apollo` will provide the components you need to send queries to and mutations and handle the data flow
- `graphql` and `graphql-tag` will handle GraphQL and write in the query language

import ApploClient to `client/src/App.js`:

### Sending GraphQL queries with React

## Using authentication with React and GraphQL

* For authentication in frontend applications, most of the time, **JSON Web Tokens** (**JWTs**) are used.

* The JWT will be returned by the backend when the user is successfully authenticated.

* this token will have an expiration date. 

* With every request that the user should be authenticated for, the token should be sent so that the backend server can determine whether the user is authenticated and allowed to take this action. 
*  no private information should be added to them.
*  Private information can only be sent from the server when a document with the correct JWT has been sent.

### Receiving JWT from the GraphQL server

This mutation can also be defined in the `client/src/constants.js` file:

```
import gql from 'graphql-tag';

...

+ export const LOGIN_USER = gql`
+   mutation loginUser($userName: String!, $password: String!) {
+     loginUser(userName: $userName, password: $password) {
+       userName
+       token
+     }
+   }
+ `;
```

`client/src/components/Checkout/Login.js` :

```
import React from 'react';
import styled from 'styled-components';
+ import { useMutation } from 'react-apollo';
import Button from '../Button/Button';
+ import { LOGIN_USER } from '../../constants';

...

const Login = () => {
+ const [loginUser] = useMutation(LOGIN_USER);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
```

Add login onClick:

```
...

<Button
  color='royalBlue'
- onClick={() => loginUser({ variables: { userName, password } })}
+ onClick={async () => {
+   const { data } = await loginUser({
+     variables: { userName, password }
+   });
+
+   if (data.loginUser && data.loginUser.token) {
+     sessionStorage.setItem('token', data.loginUser.token);
+   } else {
+     alert('Please provide (valid) authentication details');
+   }
+ }}
>
  Login
```

 the user should be redirected to the checkout page if the authentication succeeded. 

```
...

- const Login = () => {
+ const Login = ({ history }) => {

  ...

  return (
  
    ...

    <Button
      color='royalBlue'
      onClick={async () => {

        ...
 
        if (data.loginUser && data.loginUser.token) {
          sessionStorage.setItem('token', data.loginUser.token);
+         return history.push('/checkout');
        } else {
          alert('Please provide (valid) authentication details');
        }
```

 users to be able to navigate from the cart page to the checkout page,in client/src/components/Cart/Cart.js:

```
import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
+ import { Link } from 'react-router-dom';
import SubHeader from '../Header/SubHeader';
import ProductItem from '../Products/ProductItem';
+ import Button from '../Button/Button';
import Totals from './Totals';
import { GET_CART } from '../../constants';

...

const Cart = ({ history }) => (

  ...

  return (
    <CartWrapper>
      <CartItemsWrapper>
        {data.cart && data.cart.products.map(product => ( 
          <ProductItem key={product.id} data={product} />
        ))}
      </CartItemsWrapper>
      <Totals count={data.cart.total} />
+     {data.cart && data.cart.products.length > 0 && (
+       <Link to='/checkout'>
+         <Button color='royalBlue'>Checkout</Button>
+       </Link>
+     )}
    </CartWrapper>
  );
```

### Passing JWT to the GraphQL server

![img](https://my.safaribooksonline.com/getfile?item=NzM5YTc0NzhzYTlzOTVyL2QvcDlpL3RlY3MxbWc4NC02dGQ2NDMtZi1lNWJzYWVzL2FzNWEvdGVjZXM2YTAucG5nYTlmYWVkMC1kMDZhMDc0)