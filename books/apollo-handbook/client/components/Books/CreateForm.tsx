import Form from './Form'
import { useCreateBookMutation } from '../../lib/graphql-local_generated'
import { client2 } from '../../lib/client'

function CreateForm() {
    const [createBookMutation, { data, called, loading, error }] = useCreateBookMutation( { client: client2})
    const onCreateBook = ({ title }: { title: string }) => {
        //console.log('title', title)
        createBookMutation({ variables: { title }})
    }

    return (
    <>
        <Form onSubmit={onCreateBook} />
        {called && !loading && !error && (
            <div className="text-green-500 mt-4">Book created successfully!</div> )}
    </>        
    )
}

export default CreateForm