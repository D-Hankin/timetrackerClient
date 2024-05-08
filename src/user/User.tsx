import { SetStateAction, useEffect, useRef, useState } from "react";
import NewEntry from "./newEntry/NewEntry";

interface Props {
  token: string
  username: string
}

interface User {
  id: string
  username: string,
  name: string,
  email: string,
  roleId: string
}

interface Entry {
  _id: string,
  name: string,
  minutes: number
}

function User(props: Props) {
  const [entryName, setEntryName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [seconds, setSeconds] = useState<Record<string, number>>({});
  const [timers, setTimers] = useState<Record<string, boolean>>({});
  const [timeToSend, setTimeToSend] = useState<number>(0);

  const fetchUser = async () => {
    await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/user", {
      method: "GET",
      headers: {
        "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
        "Content-Type": "application/json",
        "username": props.username
      }
    })
    .then(res => res.json())
    .then(data => {
      setUser(data)
      console.log(data)
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
}

  const fetchEntries = async () => {
      await fetch("https://urchin-app-gt5j7.ondigitalocean.app/api/entry/user", {
        method: "GET",
        headers: {
          "Origin": "https://sea-lion-app-6y5s4.ondigitalocean.app/",
          "Content-Type": "application/json",
          "username": props.username,
          "Authorization": props.token
        }
      }).then(res => {
        if(!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json()
      }).then(data => {
        console.log("Fetched Entries:", data);
    
        setEntries(data);
        setTimers(Object.fromEntries(data.map((entry: { name: string; }) => [entry.name, false])));
        setSeconds(Object.fromEntries(data.map((entry: { name: string; }) => [entry.name, 0])));
    
      }).catch ((error) => {
        console.error('Error fetching entry data:', error);
      });
  };

  const handleTimerClick = (name: string) => {

    if (timers[name]) {
      clearInterval(intervalRef.current[name]);
      intervalRef.current[name] = undefined;
      setTimeToSend(seconds[name]);
      setSeconds(prevSeconds => ({
        ...prevSeconds, [name]: 0
      }));
    } 
      
    setTimers(prevTimers => ({
        ...prevTimers,
        [name]: !prevTimers[name]
    }))      
    
  }

  const updateEntryName = (name: SetStateAction<string>) => {
    setEntryName(name);
  };

  
  useEffect(() => {
    fetchUser();
    fetchEntries();
  }, []);

  useEffect(() => {
    console.log(timeToSend);
  }, [timeToSend]);
  
  
  const intervalRef = useRef<Record<string, NodeJS.Timeout | undefined>>({});
  useEffect(() => {

    Object.entries(timers).forEach(([name, timerRunning]) => {
      if (timerRunning && !intervalRef.current[name]) {
        intervalRef.current[name] = setInterval(() => {
          setSeconds(prevSeconds => ({
            ...prevSeconds,
            [name]: prevSeconds[name] + 1
          }));
        }, 1000);
      } else if (!timerRunning && intervalRef.current[name]) {
        clearInterval(intervalRef.current[name]);
        intervalRef.current[name] = undefined;
      }
    });
  
    return () => {
      Object.values(intervalRef.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [timers, setSeconds]);

  return (
    <>
      <div>{user?.username}</div>
      <NewEntry username={props.username} entryName={entryName} updateEntryName={updateEntryName} />
      <table>
        <thead>
          <tr>
            <td>Activity</td>
            <td>Total Time</td>
            <td>Start/Stop</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry: Entry) => (
            <tr key={entry.name}>
              <td>{entry.name}</td>
              <td>{entry.minutes}</td>
              <td><button onClick={() => handleTimerClick(entry.name)}>{!timers[entry.name] ? "Start Timer" : "Stop Timer"}</button></td>
              <td>{seconds[entry.name]} second(s)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default User;
