import "./TaskBar.css";
import clockBgURL from './assets/ClockAreaImg.jpg';

export default function BtnStart() {
  const startClick = () => {
    alert('clock clicked!');
  };

  return (
    <div className="clock-layout">
      <button onClick={startClick} className="clock">
        <img src={clockBgURL} alt="Clock" className="clock-bg" />
        <p className="clock-text">99:99 pm</p>
      </button>
    </div>
  );
}
