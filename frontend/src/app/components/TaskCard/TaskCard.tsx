"use client";

import "./styles.css";
import { Task } from '../../utils/definitions';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div className="card" onClick={onClick}>
      <input type="checkbox" checked={task.status === "completed"} readOnly />
      <p>{task.description}</p>
    </div>
  );
}
