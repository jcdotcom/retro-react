import "./TaskBar.css";
import btnStartURL from './assets/BtnStartImg.jpg';

export default function BtnStart() {
  const startClick = () => {
    alert('start button clicked!');
  };

  return (
    <div className="btn-layout">
      <button onClick={startClick} className="btn-start">
        <img src={btnStartURL} alt="Button Img" />
      </button>
    </div>
  );
}
