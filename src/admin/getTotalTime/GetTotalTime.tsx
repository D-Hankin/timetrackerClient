import { useEffect, useState } from 'react'

interface Props {
    username: string
}

interface Entry {
    _id: string,
    name: string,
    minutes: number
  }

function GetTotalTime(props: Props) {

    const [totalTime, setTotalTime] = useState<number>(0);
    const [adminToken, setAdminToken] = useState<string>("");
    const [minutes, setMinutes] = useState<number>(0);
    const [remainder, setRemainder] = useState(0);
 
    const fetchEntries = async () => {
        await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/entry/user", {
          method: "GET",
          headers: {
            "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
            "Content-Type": "application/json",
            "username": props.username,
            "Authorization": adminToken
          }
        }).then(res => {
          if(!res.ok) {
            throw new Error(props.username + " Network response was not ok");
          }
          return res.json()
        }).then(data => {
        
            let addTimes: number = 0; 
            data.map((entry: Entry) => {
                addTimes += entry.minutes
            });
            setTotalTime(addTimes);
      
        }).catch ((error) => {
          console.error('Error fetching entry data:', error);
        })
    };

    useEffect (() => {
        const getToken = localStorage.getItem("jwtToken");
        if(getToken !== null && getToken !== "") {
            setAdminToken(getToken);
        }
    }, []);

    useEffect (() => {
        fetchEntries();
    }, [adminToken])

    useEffect (() => {

        if (totalTime > 60) {
            setMinutes(Math.floor(totalTime/60));
            setRemainder(totalTime % 60);
        }

    }, [totalTime])

  return (
    <>
        { totalTime < 60 ? <div>{totalTime} seconds</div> : <div>{minutes} minutes {remainder} seconds</div> }
    </>
  )
}

export default GetTotalTime