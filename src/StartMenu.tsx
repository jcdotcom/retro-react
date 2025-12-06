interface StartMenuProps {
  onToggle: (id: number) => void;
  onStartClose: () => void;
  startTaskButtonKeys: number[];
}

export default function StartMenu({ onToggle, onStartClose, startTaskButtonKeys }: StartMenuProps){
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
}