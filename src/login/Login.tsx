import React, { useEffect, useState } from 'react';

interface Props {
    updateLoggedIn: () => void 
}

function Login(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/secured/login", {
            method: "POST",
            headers: {
                "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setToken(data.token)
        })
    };

    useEffect(() => {
        if (token !== "") {
            localStorage.setItem("jwtToken", token)
            props.updateLoggedIn();
        }
    }, [token])

    return (
        <div id='loginFormDiv'>
            <form id='loginForm' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input placeholder='username' value={username} onChange={handleUsernameChange}/>
                <input placeholder='password' type='password' value={password} onChange={handlePasswordChange}/>
                <button type='submit'>Enter</button>
            </form>
        </div>
    );
}

export default Login;
