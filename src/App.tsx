import{ useState } from 'react';
import './App.css';
import './StartMenu.css';
import './TaskBar.css';
import './Window.css';
import BtnStart from './BtnStart';
import ClockArea from './ClockArea';
import Task from './Task';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Window from './Window';
import bug from './assets/bug.gif';

export default function App(){
  const [tasks, setTasks] = useState([{id: 1, count: 1, title: "About me", content: <Window progid={1} />}]);
  const [taskHistory, setTaskHistory] = useState<number[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<number>(tasks[0]?.id || 0);
  const [startIsVisible, setStartVisible] = useState(false);
  
  //const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  //const TASKBAR_BTN_WIDTH = 350;
  //const TASK_WIDTH = 399;
  //const isOverflow = (tasks.length + 1) * TASK_WIDTH > windowWidth - TASKBAR_BTN_WIDTH;

  const startOpen = () =>{
    setStartVisible(!startIsVisible);
  }

  const startClose = () => {
    setStartVisible(false);
  }

  const startAction = (key: number) => {
    switch(key){
      case 0:
        alert("now shutting down the entire internet");
        break;
      case 1:
        openNewTask(1,"About Me");
        break;
      case 2:
        window.open("https://github.com/jcdotcom", "_blank");
        break;
      case 3:
        window.open("https://www.linkedin.com/in/jaycee-waycaster/", "_blank");
        break;
      case 4:
        openNewTask(2,"blank #1");
        break;
      case 5:
        openNewTask(3,"blank #2");
        break;
      case 6:
        openNewTask(4,"Programs > ");
        break;
    }
  }
  
  function openNewTask(newid: number, newtitle: string){
    //if(!isOverflow){
      const newTask = { id: newid, count: tasks.length, title: newtitle, content: <Window progid={newid} />};
      if (!(tasks.some((c) => c.id === newid))){
        setTasks(prev => [...prev, newTask]);
        //tasks.push(newTask);
        setActiveTask(newid);
      }
    //}
  }
  
  function setActiveTask(id: number) {
    setActiveTaskId(id);
    setTaskHistory((prev) => {
      const filtered = prev.filter((tid) => tid !== id);
      return [...filtered, id]; 
    });
  }

  function handleBugClick(){
    alert("dont even think about it")
  }

  function handleTaskClick(id: number){
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setActiveTask(id);
  }

  function handleTaskClose(id: number){
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setTaskHistory((prev) => prev.filter((tid) => tid !== id));
    if (activeTaskId === id) {
      const lastActive = [...taskHistory]
      .filter((tid) => tid !== id)
      .reverse()
      .find((tid) => tasks.some((c) => c.id === tid));
      setActiveTask(lastActive || 0);
    }
  }

  return (
    <div className="layout">
      <main className="main-content">
        <p className="watermark">jcworld.org</p>
        <div className="window-space">
         {tasks.map((task) => (
            <Task
              id={task.id}
              count={tasks.length}
              content={task.content}
              active={task.id === activeTaskId}
              onClose={handleTaskClose}
              onActivate={() => setActiveTask(task.id)} 
            />
          ))}
        </div>
        <div className="desktop-space">
          {startIsVisible && <div className="app-start-menu">
            <StartMenu 
              onToggle={startAction}
              onStartClose={startClose}
              startTaskButtonKeys={[
                6,5,4,3,2,1,0
              ]}
            />
          </div>}
          <img src={bug} alt="bug" className="img" onClick={handleBugClick}/>
        </div>
      </main>
      <div className="task-bar-wrapper">
        <div className="task-bar">
          <BtnStart onClick={startOpen} />
          <Taskbar tasks={tasks} onTaskClick={handleTaskClick} />
          <ClockArea />
        </div>
      </div>
    </div>
  );
}