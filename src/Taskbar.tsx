import BtnTask from "./BtnTask";

interface Task{
  id: number;
  title: string;
}

interface TaskbarProps{
  tasks: Task[];
  overflow?: number;
  onTaskClick: (id: number) => void;
}

export default function Taskbar({tasks, onTaskClick}: TaskbarProps){

  // const [isOverflow, setOverflow] = useState(overflow);
  // React.useEffect(() => {
  //   const handleOverflow = () => {
  //     setOverflow(overflow);
  //   }
  // }, []);

  return(
    <div /*ref={ref}*/ className="btn-task-layout">
      {tasks.map((task) => (
        <BtnTask
          key={task.id}
          title={task.title}
          onClick={() => onTaskClick(task.id)}
        />
        
      ))}
    </div>
  )
}