

interface StartMenuProps {
  onToggle: (id: number) => void;
  onStartClose: () => void;
  startTaskButtonKeys: number[];
}

const StartMenu: React.FC<StartMenuProps> = ({ 
  onToggle, onStartClose, startTaskButtonKeys }) => {

  return (
    <div className="start-menu-layout">
      {startTaskButtonKeys.map((key) => (
        <button
          title={`menu-btn-${key}`}
          className={`start-menu-task-${key}`}
          onClick={() => {
            onToggle(key);
            onStartClose();
          }}>
          </button>
      ))}
    </div>
  );
};

export default StartMenu;