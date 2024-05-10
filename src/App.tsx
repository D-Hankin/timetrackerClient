import { useEffect, useState } from 'react'
import './App.css'
import Login from './login/Login'
import Admin from './admin/Admin'
import User from './user/User';
import CreateAccount from './createAccount/CreateAccount';

function App() {

  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [createAccount, setCreateAccount] = useState<boolean>(false);
  

  const updateLoggedIn = () => {
    setLoggedIn(prevLoggedIn => !prevLoggedIn);
    setCreateAccount(false);
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

  const handleCreateAccount = () => {
    setCreateAccount(true);
  }

  const updateCreateAccount = () => {
    setCreateAccount(prevCreateAccount => !prevCreateAccount);
  }

  useEffect(() => {
      localStorage.setItem("jwtToken", token)
      updateLoggedIn();
  }, [token])

  useEffect(() => {
    setLoggedIn(false);
    setCreateAccount(false);
  }, [])
  

  return (
    <>
      { loggedIn ? <button onClick={handleLogOut}>Log out</button>: <button onClick={handleCreateAccount}>Create Account</button>  }
      <h1>The Pit of Despair Time Management System</h1>
      { createAccount ? <CreateAccount updateCreateAccount={updateCreateAccount}/> : null}
      { !loggedIn ? <Login updateLoggedIn={updateLoggedIn} updateToken={updateToken} updateRole={updateRole} username={username} updateUsername={updateUsername}/> 
          : role === "admin" ? <Admin token={token} username={username}/> : role === "user" ? <User token={token} username={username}/> : null}
    </>
  )
}

export default App
