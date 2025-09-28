import btnTaskBgURL from "./assets/BtnTaskBg.jpg";

interface BtnTaskProps {
  title: string;
  onClick: () => void;
}

function BtnTask({ title, onClick }: BtnTaskProps){
  return (
    <div className="btn-task-wrapper">
      <button onClick={onClick} className="btn-task">
        <img src={btnTaskBgURL} alt={`${title} img`} className="btn-task-bg" />
        <p className="btn-text">{title}</p>
      </button>
    </div>
  );
}

export default BtnTask;