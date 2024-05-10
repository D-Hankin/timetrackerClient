import React, { useState } from 'react'

interface Props {
    updateCreateAccount: () => void
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

        await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/"
            },
            body: JSON.stringify({
                "username": username,
                "name": name,
                "password": password,
                "email": email
            })
        }).then(res => {
            if(!res.ok) {
                throw new Error("Something went wrong");
            }
            return res.json();
        }).then(data => {
            console.log(data);
        }).catch((error) => {
            console.log("error:" , error);
        })
        props.updateCreateAccount();
    }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input placeholder='Username (5-15 characters)' value={username} onChange={handleUsernameChange}/>
        <input placeholder='Full Name' value={name} onChange={handleNameChange}/>
        <input placeholder='Password' value={password} onChange={handlePasswordChange} type='password'/>
        <input placeholder='Repeat Password' value={repeatPassword} onChange={handleRepeatPasswordChange} type='password'/>
        <input placeholder='@Email' value={email} onChange={handleEmailChange} type='email'/>
        <button>Submit (to the King)</button>
    </form>
  )
}

export default CreateAccount