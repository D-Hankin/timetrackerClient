import { useEffect, useState } from 'react'
import './App.css'

interface User {
  username: string,
  name: string
}

function App() {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/user")
      .then(res => res.json())
      .then(data => {
        setUser(data)
        console.log(data)
      });
    } catch (error) {
      console.error('Error fetching user data:')
    }
  }
  

  return (
    <>
      <h1>The Pit of Despair Time Management System</h1>
      { user !== null ? <h2>{ user.username + " " + user.name }</h2> : <h2>No user found</h2>}
    </>
  )
}

export default App
