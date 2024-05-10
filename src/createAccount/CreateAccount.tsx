import React, { useState } from 'react';
import "./createAccount.css";

interface Props {
    updateCreateAccount: () => void,
}

function CreateAccount(props: Props) {

    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleUsernameChange = ((e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    });
    
    const handleNameChange = ((e: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(e.target.value);
    });

    const handlePasswordChange = ((e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    });

    const handleRepeatPasswordChange = ((e: { target: { value: React.SetStateAction<string>; }; }) => {
        setRepeatPassword(e.target.value);
    });

    const handleEmailChange = ((e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password === repeatPassword && password.trim() !== "" && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && username.trim() !== "" && name.trim() !== "") {
            await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/"
                },
                body: JSON.stringify({
                    "username": username.trim(),
                    "name": name.trim(),
                    "password": password,
                    "email": email.trim()
                })
            }).then(res => {
                if(!res.ok) {
                    throw new Error("Something went wrong");
                }
                return res.json();
            }).catch((error) => {
                console.log("error:" , error);
            })
            props.updateCreateAccount();
        } else if (password !== repeatPassword) {
            alert("The passwords do not match!");
        } else if (username.trim() === "" || name.trim() === "" || password.trim() === "") {
            alert("You must fill in all the fields!");
        } else {
            alert("Invalid email!");
        }

    }

  return (
    <form id='createForm' onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input className="createInput" placeholder='Username (5-15 characters)' value={username} onChange={handleUsernameChange}/>
        <input className="createInput" placeholder='Full Name' value={name} onChange={handleNameChange}/>
        <input className="createInput" placeholder='Password' value={password} onChange={handlePasswordChange} type='password'/>
        <input className="createInput" placeholder='Repeat Password' value={repeatPassword} onChange={handleRepeatPasswordChange} type='password'/>
        <input className="createInput" placeholder='@Email' value={email} onChange={handleEmailChange} type='email'/>
        <button>Submit (to The Dark Lord)</button>
    </form>
  )
}

export default CreateAccount