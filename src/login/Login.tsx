import React, { useEffect, useState } from 'react';
import './login.css';

interface Props {
    updateLoggedIn: () => void,
    updateToken: (token: string) => void,
    updateRole: (role: string) => void,
    updateUsername: (username: string) => void
    username: string
}

function Login(props: Props) {
    
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [inputUsername, setInputUsername] = useState<string>("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputUsername.trim() == "" || password.trim() == "") {
            setError("You need to enter a valid username and password!")
        } else {
            fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/secured/login", {
                method: "POST",
                headers: {
                    "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "username": inputUsername,
                    "password": password
                })
            }).then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data.token) {
                    props.updateToken(data.token);
                    props.updateRole(data.role);
                    setError("");
                }
            })
            .catch(error => {
                setError("Incorrect username or password");
                console.error('Error fetching data:', error);
            });
        }
    };
    useEffect(() => {
        if (inputUsername !== "") {
            props.updateUsername(inputUsername);
        }
    }, [inputUsername])

    return (
        <div id='loginFormDiv'>
            <form id='loginForm' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input placeholder='username' value={inputUsername} onChange={handleUsernameChange}/>
                <input placeholder='password' type='password' value={password} onChange={handlePasswordChange}/>
                <button type='submit'>Enter</button>
                <p>{ error }</p>
            </form>
        </div>
    );
}

export default Login;
