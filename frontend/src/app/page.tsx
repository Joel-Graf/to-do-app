"use client";

import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./components/TaskCard/TaskCard";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState([
    { id: 1, task: "teste", status: "completed" },
    { id: 2, task: "teste2", status: "pending" },
    { id: 3, task: "teste3", status: "completed" },
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
          width: "100%",
        }}
      >
        <h2>Add Task</h2>
        <div style={{ display: "flex" }}>
          <input type="text" />
          <FontAwesomeIcon icon={faPlusCircle} style={{ width: "1rem" }} />
        </div>

        <div
          style={{
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
            padding: "1rem",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "60%",
          }}
        >
          {data.map((taskObj) => (
            <TaskCard
              key={taskObj.id}
              task={taskObj.task}
              status={taskObj.status}
              onClick={() => handleChangeStatus(taskObj.id)}
            />
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
