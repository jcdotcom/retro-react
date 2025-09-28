import React from "react";
import{useRef, useState} from "react";
import "./Window.css";

interface TaskProps{
  id: number;
  title: string;
  content: string;
  x?: number;   // trying to make absolute position windows
  y?: number;
  active?: boolean;
  onActivate: () => void;
  onClose: (id: number) => void;
}

function Task({ id, title, content, x = 0, y = 0, onClose, active = false, onActivate }: TaskProps){
  const taskRef = useRef<HTMLDivElement>(null);
  const col = (id - 1) % 4;             
  const row = Math.floor((id - 1) / 4); 
  let prex;
  let prey;
  if(x == 0 || y == 0){
    prex = 20 + (30 * id);
    prey = 20 + (40 * (col + 1)) + row * 20;
  }
  else{
    prex = x;
    prey = y;
  }
  const posx = prex;
  const posy = prey;
  const [position, setPosition] = useState({ 
    top: posy, left: posx 
  });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ y: 0, x: 0 });

  const handleMouseDown = (e: React.MouseEvent) =>{
    if (!taskRef.current) return;
    setDragging(true);
    onActivate();
    offset.current ={
      x: e.clientX - taskRef.current.offsetLeft,
      y: e.clientY - taskRef.current.offsetTop,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) =>{
    if (!dragging) return;
    setPosition({
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () =>{
    setDragging(false);
  };

  React.useEffect(() =>{
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () =>{
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);  

return (
  <div
  ref={taskRef}
  className="task-container"
  style={{
    top: position.top,
    left: position.left,
    zIndex: active ? 1000 : 1,
  }}
  onMouseDown={(e) => {
    onActivate();
    if ((e.target as HTMLElement).closest(".task-header")) {
      setDragging(true);
      offset.current = {
        x: e.clientX - taskRef.current!.offsetLeft,
        y: e.clientY - taskRef.current!.offsetTop,
      };
    }
  }}>
    <div className={`task-header ${dragging ? "dragging" : ""} 
    ${active ? "active" : ""}`} onMouseDown={handleMouseDown}>
      <h2 className="task-title">{title}</h2>
      <button className="task-close-btn" onClick={() => onClose(id)}>
        X
      </button>
    </div>
    <div className="task-body">
      <p>{content}</p>
    </div>
  </div>
)}

export default Task;