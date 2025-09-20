import "./TaskBar.css";
import BtnTask from "./BtnTask";

interface Task{
  id: number;
  title: string;
}

interface TaskbarProps{
  tasks: Task[];
  onTaskClick: (id: number) => void;
}

function Taskbar({ tasks, onTaskClick }: TaskbarProps){

// --- Create a ResizeObserver instance --- 

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      // entry.target is the DOM element that changed size
      const element = entry.target as HTMLElement;
      
      // Check if the element has shrunk
      // You'll need to store the previous size to compare
      const previousWidth = element.dataset.previousWidth;
      const currentWidth = entry.contentRect.width;

      if (previousWidth && currentWidth < parseFloat(previousWidth)) {
        console.log(`Element ${element.id} has shrunk!`);
        // Add your custom logic here, like adding a class
        element.classList.add('is-shrunk');
      }

      // Update the stored size for the next comparison
      element.dataset.previousWidth = currentWidth.toString();
    }
  });

  // Select the element(s) you want to observe
  const elementToObserve = document.getElementById('BtnTask');

  if (elementToObserve) {
    // Begin observing the element
    resizeObserver.observe(elementToObserve);
  }

// --- Finish ---

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

export default Taskbar;