import { useEffect, useState } from 'react'

const startTime = Date.now();

const formatedDate = date => new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);


export default function DigitalClock() {
    const [time, setTime] = useState(performance.now());
    useEffect(function(){
        let id = setInterval(() => setTime(performance.now()), 1000);
        return () => clearInterval(id);
    },[])

    const showTime = formatedDate(startTime + time);
    
    return (
        <div className="time__container">{showTime}</div>
    )
}
