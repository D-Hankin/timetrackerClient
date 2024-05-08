import Admin from "./admin/Admin"
import User from "./user/User"


interface Props {
  role: string,
  token: string
}

function UserPage(props: Props) {
  return (
    <>
      <div>UserPage: {props.role}</div>
      { props.role === "admin" ? <Admin /> : <User />}
    </>
  )
}

export default UserPage