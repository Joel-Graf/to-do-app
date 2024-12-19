"use client";

import "./styles.css";
import { TaskDTO } from "@/app/constants/types";

interface TaskCardProps {
  task: TaskDTO;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div className="card" onClick={onClick}>
      <input type="checkbox" checked={task.checked} readOnly />
      <p>{task.description}</p>
    </div>
  );
}
