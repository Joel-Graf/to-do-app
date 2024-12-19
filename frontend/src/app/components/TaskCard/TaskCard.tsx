import { TaskDTO } from "@/app/constants/types";

interface TaskCardProps {
  task: TaskDTO;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
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
          accentColor: "#28a745", // Cor do checkbox
        }}
      />
      <p style={{ margin: 0, flexGrow: 1 }}>{task.description}</p>
    </div>
  );
}
