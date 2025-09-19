import "./TaskBar.css";
import btnStartURL from './assets/BtnStartImg.jpg';

interface BtnStartProps{
  onClick: () => void;
}

function BtnStart({onClick}: BtnStartProps){
  return(
    <div className="btn-layout">
      <button onClick={onClick} className="btn-start">
        <img src={btnStartURL} alt="Button Img" />
      </button>
    </div>
  );
}

export default BtnStart;