import React from "react";
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "react-apollo";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AppContainer from "./AppContainer";
import { Notifications } from 'expo';
import { ADD_NOTIFICATION, GET_NOTIFICATIONS } from './constants';

const IP = '192.168.0.13'   //'192.168.1.10' -iMac  192.168.0.13 - MBP
const HTTP_URL = `http://${IP}:4000/graphql`;
const WS_URL = `ws://${IP}:4000/graphql`;
const httpLink = new HttpLink({
  uri: HTTP_URL
});

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: authLink.concat(link),
    cache,
    resolvers: {
       Mutation: {
         addNotification: async (_, { id, title, body }) => {
           const { data } = await client.query({ query: GET_NOTIFICATIONS })

           cache.writeData({
             data: {
                notifications: [
                    ...data.notifications,
                    { id, title, body, __typename: 'notifications' },
                ],
             },
           });
         }
       }
    },
    typeDefs: `
        type Notification {
          id: Number!
          title: String!
          body: String!
        }
        extend type Query {
          notifications: [Notification]!
        }
    `
});

cache.writeData({
    data: {
        notifications: []
    }
})

const App = () => {
    React.useEffect(() => {
        Notifications.addListener(handleNotification);
    })

    const handleNotification = ({data}) => {
        client.mutate({
            mutation: ADD_NOTIFICATION,
            variables: {
                id: Math.floor(Math.random() * 500) + 1,
                title: data.title,
                body: data.body
            }
        })
    }

    return (
        <ApolloProvider client={client}>
            <ActionSheetProvider>
                <AppContainer/>
            </ActionSheetProvider>
        </ApolloProvider>
    )
};

export default App;