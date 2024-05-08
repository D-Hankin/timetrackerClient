import { useEffect, useState } from 'react'
import './App.css'
import Login from './login/Login'
import Admin from './admin/Admin'
import User from './user/User';

function App() {

  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("")
  

  const updateLoggedIn = () => {
    setLoggedIn(prevLoggedIn => !prevLoggedIn);
  }

  const updateToken = (token: string) => {
    if (token !== "") {
      setToken(token);
    }
  }

  const updateRole = (role: string) => {
    setRole(role);
  }

  const updateUsername = (username:string) => {
    setUsername(username);
  }

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    updateLoggedIn();
  }

  useEffect(() => {
      localStorage.setItem("jwtToken", token)
      updateLoggedIn();
  }, [token])
  

  return (
    <>
      { loggedIn ? <button onClick={handleLogOut}>Log out</button>: null  }
      <h1>The Pit of Despair Time Management System</h1>
      { !loggedIn ? <Login updateLoggedIn={updateLoggedIn} updateToken={updateToken} updateRole={updateRole} username={username} updateUsername={updateUsername}/> 
          : role === "admin" ? <Admin token={token} username={username}/> : <User token={token} username={username}/>}
    </>
  )
}

export default App
