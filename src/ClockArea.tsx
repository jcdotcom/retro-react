import{ useState, useEffect } from "react";
import clockBgURL from './assets/ClockAreaImg.jpg';

export default function ClockArea(){
  const [time, setTime] = useState(new Date);
  useEffect(() =>{ 
    let clock=setTimeout(()=>{
      setTime(new Date); 
    }, 1000)
    return () => clearTimeout(clock)
  }, [time]);

  const startClick = () =>{
    alert('clock clicked!');
  };

  return (
    <div className="clock-layout">
      <button onClick={startClick} className="clock">
        <img src={clockBgURL} alt="Clock" className="clock-bg" />
        <p className="clock-text">{time.toLocaleTimeString().substring(0,10)}</p>
      </button>
    </div>
  );
}