import { forwardRef } from "react";
import BtnTask from "./BtnTask";

interface Task{
  id: number;
  title: string;
}

interface TaskbarProps{
  tasks: Task[];
  onTaskClick: (id: number) => void;
}

const Taskbar = forwardRef<HTMLDivElement, TaskbarProps>(({ tasks, onTaskClick }, ref) =>
  <div ref={ref} className="btn-task-layout">
    {tasks.map((task) => (
      <BtnTask
        key={task.id}
        title={task.title}
        onClick={() => onTaskClick(task.id)}
      />
    ))}
  </div>
);

export default Taskbar;