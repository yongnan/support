import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: "https://apollo-handbook-api.vercel.app/api/graphql",
    cache: new InMemoryCache(),
})

export const client2 = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
})

export default client