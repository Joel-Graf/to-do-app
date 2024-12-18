"use client";

import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./components/TaskCard/TaskCard";
import { useState } from "react";
import { Task } from "./utils/definitions";

export default function Home() {
  const [data, setData] = useState<Task[]>([
    { id: 1, description: "teste", status: "completed" },
    { id: 2, description: "teste2", status: "pending" },
    { id: 3, description: "teste3", status: "completed" },
  ]);

  const handleChangeStatus = (id: number) => {
    setData((prevData) =>
      prevData.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  };

  return (
    <div className={styles.page}>
      <header>
        <h1>To-do-app ;)</h1>
      </header>
      <main
        style={{
          minWidth: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Add Task</h2>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <input type="text" style={{ flexGrow: 1 }} />
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ width: "1.6rem", height: "100%" }}
            />
          </div>
        </div>

        <div
          style={{
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
            padding: "1rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {data.map((taskObj) => (
            <TaskCard
              key={taskObj.id}
              task={taskObj}
              onClick={() => handleChangeStatus(taskObj.id!)}
            />
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
