"use client";

import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./components/TaskCard/TaskCard";
import { useEffect, useState } from "react";
import api from "./services/api";
import { TaskDTO } from "./constants/types";

export default function Home() {
  const [taskInput, setTaskInput] = useState<string>("");
  const [data, setData] = useState<TaskDTO[]>([]);

  useEffect(() => {
    api.getAllTasks().then((e) => setData(e));
  }, []);

  const handleChangeStatus = (id: number) => {
    setData((prevData) =>
      prevData.map((task) =>
        task.id === id
          ? {
              ...task,
              checked: !task.checked,
            }
          : task
      )
    );
  };

  const handleAddTask = (taskDescription: string) => {
    const task = {
      description: taskDescription,
      checked: false,
      createdAt: new Date(),
    };
    api.createTask(task);
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
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              type="text"
              style={{ flexGrow: 1 }}
            />
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ width: "1.6rem", height: "100%" }}
              onClick={() => handleAddTask(taskInput)}
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
