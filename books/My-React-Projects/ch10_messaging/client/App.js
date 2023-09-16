import React from "react";
import { AsyncStorage } from 'react-native';
import AppContainer from "./AppContainer";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext }  from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from 'react-apollo';

//const API_URL = 'http://192.168.0.13:4000/graphql';
const API_URL = 'http://192.168.1.10:4000/graphql';
const SOCKET_URL = 'ws://192.168.1.10:4000/graphql';

const httpLink = new HttpLink({
    uri: API_URL,
})

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})

const wsLink = new WebSocketLink({
  uri: SOCKET_URL,
  options: {
    reconnect: true,
  },
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);

        return (
           definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const cache = new InMemoryCache();
const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache
});

const App = () => (
    <ApolloProvider client={client}>
        <AppContainer />
    </ApolloProvider>
);
export default App;
