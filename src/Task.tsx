import React from "react";
import {useRef, useState} from "react";
import "./Task.css";

interface TaskProps {
  id: number;
  title: string;
  content: string;
  onClose: (id: number) => void;
}

function Task({ id, title, content, onClose }: TaskProps) {
    const taskRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 100, left: 100 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
  
    const handleMouseDown = (e: React.MouseEvent) => {
      if (!taskRef.current) return;
      setDragging(true);
      offset.current = {
        x: e.clientX - taskRef.current.offsetLeft,
        y: e.clientY - taskRef.current.offsetTop,
      };
      e.preventDefault();
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        left: e.clientX - offset.current.x,
        top: e.clientY - offset.current.y,
      });
    };
  
    const handleMouseUp = () => {
      setDragging(false);
    };
  
    React.useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [dragging]);  
  
    return (
        <div
          ref={taskRef}
          className="task-container"
          style={{ top: position.top, left: position.left }}
        >
          <div className="task-header" onMouseDown={handleMouseDown}>
            <h2 className="task-title">{title}</h2>
            <button className="task-close" onClick={() => onClose(id)}>
              ×
            </button>
          </div>
          <div className="task-body">
            <p>{content}</p>
          </div>
        </div>
      );
}

export default Task;