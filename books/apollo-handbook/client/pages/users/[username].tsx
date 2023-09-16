import { useRouter } from 'next/router'
import UserProfile from '../../components/Users/UserProfile'
import Layout from '../../components/Layout'
import Link from "next/link"

const User = () => {
    const router = useRouter();
    const { username } = router.query;

    return (
        <Layout>
            <Link href="/users">
                back to users
            </Link>
            <UserProfile username={username as string} />
        </Layout>
    )
}

export default User