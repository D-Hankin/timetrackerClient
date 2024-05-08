import { useEffect, useState } from "react";

interface Props {
  token: string
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

    console.log(props.username);
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
        console.log(data)
      });
    } catch (error) {
      console.error('Error fetching user data:')
    }
  }

  const fetchAllUsers = async () => {
    await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/admin/all", {
      method: "GET",
      headers: {
        "Authorization": props.token
      }
    }).then(res => {
      if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }).then(data => {
        setAllUsers(data);
      }).catch(error => {
        setError("Incorrect username or password");
        console.error('Error fetching data:', error);
      });
    }
    
    useEffect (() => {
      fetchUser();
      fetchAllUsers();
    }, [])

    return (
      <>
      <div>{user?.username}</div>
        <ul>
          {allUsers?.map((user: User) => (
            <li key={user.id}>{user.username}<button>See Stats</button><button>Burn User</button></li>
          ))}
        </ul>
      <p>{error}</p>
    </>
  )
}

export default Admin