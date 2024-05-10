import { useEffect, useState } from "react";

interface Props {
    time: number
}

function FormatTime(props: Props) {

    const [minutes, setMinutes] = useState<number>(0);
    const [remainder, setRemainder] = useState(0);

    const calculateTime = () => {
        if (props.time > 60) {
            setMinutes(Math.floor(props.time/60));
            setRemainder(props.time % 60);
        }
    }

    useEffect (() => {
        calculateTime();
    }, [])

  return (
    <>
        {props.time > 60 ? <td>{minutes} minutes {remainder} seconds</td> : <td>{props.time} seconds</td>}
    </>
    
  )
}

export default FormatTime