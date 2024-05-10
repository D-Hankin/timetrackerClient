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
    localStorage.setItem("role", role);
  }

  const updateUsername = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", username);
  }

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    updateLoggedIn();
  }

  const handleCreateAccount = () => {
    setCreateAccount(true);
  }

  const updateCreateAccount = () => {
    setCreateAccount(prevCreateAccount => !prevCreateAccount);
  }

  useEffect(() => {
    if(token !== "") {
      localStorage.setItem("jwtToken", token)
      updateLoggedIn();
    }
  }, [token])

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken !== null && storedToken !== undefined) {
      setToken(storedToken);
    }
    const storedrole = localStorage.getItem("role");
    if (storedrole !== null && storedrole !== undefined) {
      setRole(storedrole);
    }
    const storedUsername = localStorage.getItem("username");
    if (storedUsername !== null && storedUsername !== undefined) {
      setUsername(storedUsername);
    }
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
