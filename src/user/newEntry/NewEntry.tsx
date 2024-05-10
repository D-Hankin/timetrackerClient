import { SetStateAction, useEffect, useState } from "react";
import './newEntry.css';

interface Props {
  username: string,
  entryName: string,
  updateEntryName: (name: SetStateAction<string>) => void
}

function NewEntry(props: Props) {

    const [message, setMessage] = useState<string>("");
    const [token, setToken] = useState<string>("")

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if (props.entryName.trim() !== "") {
          await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/entry/start-entry", {
            method: "POST",
            headers: {
              "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
              "Content-Type": "application/json",
              "Authorization": token
            },
            body: JSON.stringify({
              "username": props.username,
              "name": props.entryName,
              "minutes": 0
            })
          }).then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.text();
          }).then(data => {
            setMessage(data);
            props.updateEntryName("");
          }).catch(() => {
            setMessage("That activity already exists!");
          });
        }
    }

    const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        props.updateEntryName(e.target.value);
    }

    useEffect (() => {
      const getToken = localStorage.getItem("jwtToken")
      if (getToken !== null) {
        setToken(getToken);
      }
    }, [])

  return (
    <form id="newEntryForm" onSubmit={handleSubmit}>
        <h2>New Entry</h2>
        <input placeholder="name" value={props.entryName} onChange={handleNameChange}></input>
        <button>Save</button>
        <p>{message}</p>
    </form>
  )
}

export default NewEntry