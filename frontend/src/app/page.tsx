"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./components/TaskCard/TaskCard";
import { useEffect, useState, useRef } from "react";
import api from "./services/api";
import { TaskDTO } from "./constants/types";
import LoadingSpinner from "./components/TaskCard/UI/LoadingSpinner/LoadingSpinner";

export default function Home() {
  const [taskInput, setTaskInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TaskDTO[]>([]);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    return api
      .getAllTasks()
      .then((e) => setData(e))
      .finally(() => {
        setLoading(false);
      });
  };

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
    setTaskInput("");
    const task = {
      description: taskDescription,
      checked: false,
      createdAt: new Date(),
    };
    api.createTask(task).then(() => refreshData());
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "2rem 4rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <header>
        <h1>To-do-app ;)</h1>
      </header>
      <main
        style={{
          minWidth: "40%",
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
              style={{
                flexGrow: 1,
                boxShadow: "0 2px 4px 0px rgba(0,0,0,0.2)",
              }}
            />
            <FontAwesomeIcon
              icon={faPlusCircle}
              ref={iconRef}
              style={{
                width: "1.6rem",
                height: "1.6rem",
                color: "#28a745",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease-in-out",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 2px 4px 0px rgba(0,0,0,0.2)",
              }}
              onClick={() => handleAddTask(taskInput)}
              onMouseEnter={() =>
                (iconRef.current!.style.boxShadow =
                  "0 4px 8px 0px rgba(0,0,0,0.2)")
              }
              onMouseLeave={() =>
                (iconRef.current!.style.boxShadow =
                  "0 2px 4px 0px rgba(0,0,0,0.2)")
              }
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
            minHeight: "50vh",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {loading ? (
            <div style={{ height: "40vh" }}>
              <LoadingSpinner />
            </div>
          ) : (
            data.map((taskObj) => (
              <TaskCard
                key={taskObj.id}
                task={taskObj}
                onClick={() => handleChangeStatus(taskObj.id!)}
              />
            ))
          )}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
