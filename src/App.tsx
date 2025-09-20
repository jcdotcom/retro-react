import{ useState } from 'react'
import './App.css'
import Task from "./Task";
import BtnStart from "./BtnStart";
import BtnTasks from "./Taskbar";
import ClockArea from "./ClockArea";

interface OpenTask{
  id: number;
  title: string;
  content: string;
}

function App(){
  const [tasks, setTasks] = useState([{id: 1, title: "Task 1"}]);
  const [taskHistory, setTaskHistory] = useState<number[]>([]);
  const [openContainers, setOpenContainers] = useState<OpenTask[]>(() =>
    tasks.length > 0
      ? [
         {
            id: tasks[0].id,
            title: tasks[0].title,
            content: `Content for ${tasks[0].title}`,
          },
        ]
      : []
  );

  const [activeTaskId, setActiveTaskId] = useState<number>(tasks[0]?.id || 0);

  function setActiveTask(id: number) {
    setActiveTaskId(id);
    setTaskHistory((prev) => {
      const filtered = prev.filter((tid) => tid !== id); // remove if it exists
      return [...filtered, id]; // push to the end (most recent)
    });
  }

  function handleTaskClick(id: number){
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (openContainers.some((c) => c.id === id)) return;

    setOpenContainers((prev) => [
      ...prev,
     { id: task.id, title: task.title, content: `Content for ${task.title}` },
    ]);
    setActiveTaskId(id);
  }

  function handleTaskClose(id: number){
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setOpenContainers((prev) => prev.filter((c) => c.id !== id));
    
    setTaskHistory((prev) => prev.filter((tid) => tid !== id)); // remove closed id

    if (activeTaskId === id) {
      const lastActive = [...taskHistory]
      .filter((tid) => tid !== id)
      .reverse()
      .find((tid) => openContainers.some((c) => c.id === tid));
      setActiveTask(lastActive || 0);
    }
  }

  function openNewTask(){
    const newId = tasks.length + 1;
    const newTask ={ id: newId, title: `Task ${newId}` };
    setTasks((prev) => [...prev, newTask]);
    setOpenContainers((prev) => [
      ...prev,
     { id: newTask.id, title: newTask.title, content: `Content for ${newTask.title}` },
    ]);
    setActiveTask(newId);
  }

  return (
    <div className="layout">
      <main className="main-content">
        <div className="window-space">
         {openContainers.map((container) => (
            <Task
              key={container.id}
              id={container.id}
              title={container.title}
              content={container.content}
              active={container.id === activeTaskId}
              onClose={handleTaskClose}
              onActivate={() => setActiveTask(container.id)} 
            />
          ))}
        </div>
        <div className="desktop-space">
          <button onClick={openNewTask}>New Task</button>
        </div>
      </main>

      <div className="task-bar">
        <BtnStart 
          onClick={openNewTask}
        />
        <BtnTasks tasks={tasks} onTaskClick={handleTaskClick} />
        <ClockArea />
      </div>
    </div>
  );
}

export default App;