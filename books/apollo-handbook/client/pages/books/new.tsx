import CreateBookForm from "../../components/Books/CreateForm"
import Layout from '../../components/Layout'

const NewBook = () => {
    return (
    <Layout>
        <h1>Create a book</h1>
        <CreateBookForm />
    </Layout>
    )
}

export default NewBook