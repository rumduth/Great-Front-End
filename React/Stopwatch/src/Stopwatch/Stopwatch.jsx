import { useEffect, useRef, useState } from "react"

export default function Stopwatch() {
const [isRunning, setIsRunning] = useState(false);
const [startTime, setStartTime] = useState(0);
const [lastStoppedTime, setLastStoppedTime] = useState(0);
const [totalStoppedTime, setTotalStoppedTime] = useState(0);
const [runningTime, setRunningTime] = useState(0);
const animationRef = useRef(null);

useEffect(function(){
    const animate = (curTime) => {
        setRunningTime(curTime - startTime - totalStoppedTime);
        animationRef.current = requestAnimationFrame(animate);
    }
    cancelAnimationFrame(animationRef.current);
    if(isRunning) 
    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
},[isRunning,startTime,totalStoppedTime])

function handleToggleButtonStatus(){
    if(isRunning){
        setLastStoppedTime(performance.now());
        cancelAnimationFrame(animationRef.current);
    }else{
        setTotalStoppedTime(prev => prev + performance.now() - lastStoppedTime);
    }
    setIsRunning(prev => !prev);
}

function handleReset(){
    setIsRunning(false);
    setStartTime(performance.now());
    setLastStoppedTime(performance.now());
    setTotalStoppedTime(0);
    setRunningTime(0);
    cancelAnimationFrame(animationRef.current);
    
}

const seconds = Math.floor(runningTime / 1000);
const milliseconds = Math.round(runningTime % 1000 / 10).toString().padEnd(2, '0');

return (
<div>
    <p><span className="second">{seconds}</span>s<span className="milliseconds">{milliseconds}</span></p>
    <div>
    <button onClick={handleToggleButtonStatus}>{isRunning ? "Stop" : "Start"}</button> <button onClick={handleReset}>Reset</button>
    </div>
</div>
)
}
