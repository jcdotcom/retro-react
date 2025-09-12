import "./TaskBar.css";
import BtnTask from "./BtnTask";

interface Task {
  id: number;
  title: string;
}

interface BtnTasksProps {
  tasks: Task[];
  onTaskClick: (id: number) => void;
}

function BtnTasks({ tasks, onTaskClick }: BtnTasksProps) {
  return (
    <div className="btn-task-layout">
      {tasks.map((task) => (
        <BtnTask
          key={task.id}
          title={task.title}
          onClick={() => onTaskClick(task.id)}
        />
      ))}
    </div>
  );
}

export default BtnTasks;