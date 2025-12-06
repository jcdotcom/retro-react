import btnTaskBgURL from "./assets/BtnTaskBg.jpg";

interface BtnTaskProps {
  key: number;
  title: string;
  onClick: () => void;
}

export default function BtnTask({ key, title, onClick }: BtnTaskProps){
  if(key == 0) return;
  return (
    <div className="btn-task-wrapper">
      <button onClick={onClick} className="btn-task">
        <img src={btnTaskBgURL} alt={`${title} img`} className="btn-task-bg" />
        <p className="btn-text">{title}</p>
      </button>
    </div>
  );
}