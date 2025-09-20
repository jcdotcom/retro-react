import{ useState, useEffect } from "react";
import "./TaskBar.css";
import clockBgURL from './assets/ClockAreaImg.jpg';

export default function ClockArea(){
  const [count, setCount] = useState(0);

  useEffect(() =>{
    const intervalId = setInterval(() =>{
      setCount((prevCount) => (prevCount === 9 ? 0 : prevCount + 1));
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  const startClick = () =>{
    alert('clock clicked!');
  };

  return (
    <div className="clock-layout">
      <button onClick={startClick} className="clock">
        <img src={clockBgURL} alt="Clock" className="clock-bg" />
        <p className="clock-text">{count}{count}:{count}{count} pm</p>
      </button>
    </div>
  );
}