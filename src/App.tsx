import { useEffect, useState } from 'react'
import './App.css'
import Login from './login/Login'
import UserPage from './userPage/UserPage'

interface User {
  username: string,
  name: string
}

function App() {

  const [user, setUser] = useState<User | null>(null)
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/user", {
        method: "GET",
        headers: {
          "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
          "Content-Type": "application/json",
          "username": "dhankin86"
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

  const updateLoggedIn = () => {
    setLoggedIn(prevLoggedIn => !prevLoggedIn);
    console.log(loggedIn);
  }
  

  return (
    <>
      <h1>The Pit of Despair Time Management System</h1>
      { !loggedIn ? <Login updateLoggedIn={updateLoggedIn}/> : <UserPage />}
      { user !== null ? <h2>{ user.username + " " + user.name }</h2> : <h2>No user found</h2>}
    </>
  )
}

export default App
