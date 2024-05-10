import { useEffect, useState } from "react";
import GetTotalTime from "./getTotalTime/GetTotalTime";
import RemoveUser from "./removeUser/RemoveUser";
import './admin.css';

interface Props {
  token: string,
  username: string
}

interface User {
  id: string,
  username: string,
  name: string,
  email: string,
  roleId: string
}

function Admin(props: Props) {

  const [error, setError] = useState<String | null>("");
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<[]>();

  const fetchUser = async () => {

    try {
      await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/user", {
        method: "GET",
        headers: {
          "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
          "Content-Type": "application/json",
          "username": props.username
        }
      })
      .then(res => res.json())
      .then(data => {
        setUser(data)
      });
    } catch (error) {
      console.error('Error fetching user data:')
    }
  }

  const fetchAllUsers = async () => {

    if (props.token !== undefined) {
      await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/admin/all", {
        method: "GET",
        headers: {
          "Authorization": props.token
        }
      }).then(res => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        }).then(data => {
          setAllUsers(data);
        }).catch(error => {
          setError("Incorrect username or password");
          console.error('Error fetching data:', error);
        });
    }
    }
    
    useEffect (() => {
      fetchUser();
      fetchAllUsers();
    }, [])

    return (
      <>
      <h2>{user?.username}</h2>
        <table id="adminTable">
          <thead>
            <tr>
              <td>User</td>
              <td>Time Logged</td>
              <td>Burn user</td>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user: User) => (
          <tr>
              <td key={user.id}>{user.username}</td>
            <td><GetTotalTime username={user.username}/></td>
            <RemoveUser username={user.username} fetchUsers={fetchAllUsers}/>
            <p>{error}</p>
          </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default Admin