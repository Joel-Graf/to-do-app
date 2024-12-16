"use client";

import "./styles.css";

interface TaskCardProps {
  task: string;
  status: "pending" | "completed";
  onClick: () => void;
}

export default function TaskCard({ task, status, onClick }: TaskCardProps) {
  return (
    <div className="card" onClick={onClick}>
      <input type="checkbox" checked={status === "completed"} readOnly />
      <p>{task}</p>
    </div>
  );
}
