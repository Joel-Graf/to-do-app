import { useState } from "react";
import { TaskDTO } from "@/app/constants/types";

interface TaskCardProps {
  task: TaskDTO;
  onClick: () => void;
  onUpdate: (updatedTask: TaskDTO) => void; // Function to update the task
}

export default function TaskCard({ task, onClick, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSingleClick = () => {
    if (clickTimeout) clearTimeout(clickTimeout);
    const timeout = setTimeout(() => {
      onClick();
      setClickTimeout(null);
    }, 150);
    setClickTimeout(timeout);
  };

  const handleDoubleClick = () => {
    if (clickTimeout) clearTimeout(clickTimeout);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedDescription != task.description) {
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
      style={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: task.checked ? "#f8f9fa" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        ...(task.checked && {
          textDecoration: "line-through",
          color: "#28a745",
        }),
      }}
    >
      <input
        type="checkbox"
        checked={task.checked}
        readOnly
        style={{
          width: "1.5rem",
          height: "1.5rem",
          accentColor: "#28a745",
        }}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            flexGrow: 1,
            padding: "0.25rem",
            border: "1px solid #28a745",
            borderRadius: "4px",
            fontSize: "1rem",
            fontFamily: "inherit",
            lineHeight: "1.5",
            height: "1.5rem",
            boxSizing: "border-box",
            backgroundColor: "transparent",
          }}
          autoFocus
        />
      ) : (
        <p
          style={{
            margin: 0,
            flexGrow: 1,
            lineHeight: "1.5",
            fontSize: "1rem",
          }}
        >
          {task.description}
        </p>
      )}
    </div>
  );
}
