import '../styles/globals.css'
//import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import client from '../lib/client'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider>
  )    
}      

export default MyApp
