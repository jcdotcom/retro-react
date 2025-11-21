import{ useEffect, useState } from 'react';
import React, { type ReactNode } from "react";
import './App.css';
import './StartMenu.css';
import './TaskBar.css';
import './Window.css';
import Task from "./Task";
import BtnStart from "./BtnStart";
import ClockArea from "./ClockArea";
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import Program from './Program';

function App(){
  const [tasks, setTasks] = useState([{id: 1, title: "About Me", content: Program(1)}]);
  const [taskHistory, setTaskHistory] = useState<number[]>([]);   
  
  const [activeTaskId, setActiveTaskId] = useState<number>(tasks[0]?.id || 0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [startIsVisible, setStartVisible] = useState(false);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const TASKBAR_BTN_WIDTH = 350;
  const TASK_WIDTH = 399;
  const isOverflow = (tasks.length + 1) * TASK_WIDTH > windowWidth - TASKBAR_BTN_WIDTH;
  // console.log("isOverflow ::: ", tasks.length+1," * ",TASK_WIDTH ," ~~ > ~~ ",windowWidth," - ",TASKBAR_BTN_WIDTH," - ", " --------------- ",  tasks.length * TASK_WIDTH, ">",windowWidth - TASKBAR_BTN_WIDTH);

  const startOpen = () =>{
    setStartVisible(!startIsVisible);
  }

  const startClose = () => {
    setStartVisible(false);
  }

  const startAction = (key: string) => {
    switch(key){
      case 'about':
        openNewTask(1,"about");
        break;
      case 'github':
      openNewTask(2,"github");
        break;
      case 'linkedin':
      openNewTask(3,"linkedin");
        break;
    }
  }
  
  function openNewTask(newid: number, newtitle: string){
    if(!isOverflow){
      let mydiv = Program(newid);
      const newTask = { id: newid, title: newtitle, content: Program(newid)};
      //setTasks((prev) => [...prev, newTask]);
      tasks.push(newTask);
      //setOpenContainers((prev) => [...prev, newTask]);
      setActiveTask(newid);
    }
  }

  function makeTaskBody(id: number){
    switch(id){
      case 0: return <></>;
      case 1: return <div><img src='assets/ef3.jpg'/><p>My silly website</p></div>;
      case 2: return <></>;
      case 3: return <></>;
    }
    return <></>;
  }
  
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
    if (tasks.some((c) => c.id === id)) return;
    setActiveTask(id);
  }

  function handleTaskClose(id: number){
    setTasks((prev) => prev.filter((t) => t.id !== id));
    //setOpenContainers((prev) => prev.filter((c) => c.id !== id));
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
        <div className="window-space">
         {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
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
                1,2,3
              ]}
            />
          </div>}

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

export default App;