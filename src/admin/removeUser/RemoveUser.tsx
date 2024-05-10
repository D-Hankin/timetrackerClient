import { useEffect, useState } from 'react'
import fireImg from "../../assets/fire.png";

interface Props {
    username: string,
    fetchUsers: () => void
}

function RemoveUser(props: Props) {

    const [message, setMessage] = useState<string>("");
    const [adminToken, setAdminToken] = useState<string>("");

    const handleRemoveClick = async (username: string) => {
        await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/admin/remove-user", {
        method: "DELETE",
        headers: {
          "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
          "Content-Type": "application/json",
          "username": username,
          "Authorization": adminToken
        }
    })
    .then(res => {
        if(!res.ok) {
            throw new Error("User yet to be damned!");
        }
    return res.text()})
        .then(data => {
        setMessage(data);
        props.fetchUsers();
      }).catch (() => {
        setMessage("You are not worthy!");
      });
    }

    useEffect(() => {
        const getToken = localStorage.getItem("jwtToken");
        if (getToken !== null && getToken !== "") {
            setAdminToken(getToken);
        }
    }, []);

  return (
    <td>
        <img onClick={() => handleRemoveClick(props.username)} src={fireImg} />
        <p>{message}</p>
    </td>
  )
}

export default RemoveUser