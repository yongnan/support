import { useUserQuery, UserQuery } from "../../lib/graphql_generated";

type User = Extract<UserQuery["result"],{ __typename?: "User" }>
type SuspendedUser = Extract< UserQuery["result"],{ __typename?: "SuspendedUser" }>;

const WrappedUser = ({username} : {username: string}) => {
  const {data } = useUserQuery( { variables: { username }});
  
  if (data){
    const { result } = data

    if (isSuspendedUser(result)){
        return <SuspendedUserProfile {...result}/>
    } else {
        return <Profile {...result}/>
    }
  }  
  return null
}

const Profile = ( {id, username}: User) => {
  return ( 
    <div>
      <h1>
        #{id} - {username}
      </h1>
    </div>
  )
}

const SuspendedUserProfile = ( {id, username, suspensionReason}: SuspendedUser) => {
  return ( 
    <div>
      <h1 className="text-red-500">
        #{id} - {username}
      </h1>

      <strong>Suspended: {suspensionReason}</strong>
    </div>
  )
}

function isSuspendedUser(user: UserQuery["result"]): user is SuspendedUser{ 
  return user.__typename == "SuspendedUser";
}  


export default WrappedUser;