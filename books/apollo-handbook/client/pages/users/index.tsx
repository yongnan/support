import { useRouter } from 'next/router'
import UserProfile from '../../components/Users/UserProfile'
import Layout from '../../components/Layout'
import Link from "next/link"
import { isActivePath } from '../../utils/pageUtil'

const User = () => {
    const router = useRouter();
    const isActive = (path: string) => isActivePath(router, path)
    const { username } = router.query;

    return (
        <Layout>
            <div>
                <Link href="/users/badboy">
                    <a data-active={isActive("/users")}>Bad User</a>
                </Link>
            </div>
            <div>
                <Link href="/users/goodie">
                    <a data-active={isActive("/users/goodie")}>User</a>
                </Link>
            </div>
        </Layout>
    )
}

export default User