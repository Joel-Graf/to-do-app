import { useState } from "react";
import { TaskDTO } from "@/app/constants/types";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: TaskDTO;
  onClick: () => void;
  onUpdate: (updatedTask: TaskDTO) => void;
}

export default function TaskCard({ task, onClick, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSingleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    const timeout = setTimeout(() => {
      onClick();
    }, 200);
    setClickTimeout(timeout);
  };

  const handleDoubleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedDescription !== task.description) {
      onUpdate({ ...task, description: editedDescription });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      onUpdate({ ...task, description: editedDescription });
    }
  };

  return (
    <div
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      className={`${styles.taskCard} ${task.checked ? styles.checked : ""}`}
    >
      <input
        type="checkbox"
        checked={task.checked}
        readOnly
        className={styles.taskCheckbox}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={styles.taskInput}
          autoFocus
        />
      ) : (
        <p className={styles.taskText}>{task.description}</p>
      )}
    </div>
  );
}
