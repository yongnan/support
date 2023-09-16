import type { NextPage } from 'next'
import Books from '../components/Books'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Books />
    </Layout>
  )
}

export default Home