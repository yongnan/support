import Link from "next/link"
import { useRouter } from "next/router"
import { useApolloClient } from '@apollo/client';
import { isActivePath } from '../utils/pageUtil'

// function isActive(pathname) {
//   return (
//     typeof document !== "undefined" && document.location.pathname === pathname
//   )
// }

const Header = () => {
  const router = useRouter()
  const isActive = (path: string) => isActivePath(router, path)
  const isBookPath = (isActive("/") || isActive("/books"))

  const apolloClient = useApolloClient();

  const Books = ({isActive}: {isActive: boolean}) => {
    if (isActive){
      return (
        <div className="right">
          <Link href="/books/new">
            <a data-active={isActive}>+ Create book</a>
          </Link>
        </div>
      )
    }
    return null
  }

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Home
          </a>
        </Link>
        <Link href="/users">
          <a data-active={isActive("/users")}>Users</a>
        </Link>
      </div>
      <Books isActive={isBookPath}/>
    </nav>
  )
}

export default Header
