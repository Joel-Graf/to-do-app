"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./components/TaskCard/TaskCard";
import { useEffect, useState, useRef } from "react";
import api from "./services/api";
import { TaskDTO } from "./constants/types";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";

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

  const handleUpdateTask = (updatedTask: TaskDTO) => {
    setLoading(true);
    return api
      .updateTask(updatedTask.id!, updatedTask)
      .then(() => {
        setData((data) =>
          data.map((task) => {
            if (task.id == updatedTask.id) {
              return updatedTask;
            } else {
              return task;
            }
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    return api
      .deleteTask(id)
      .then(() => {
        setData((data) => data.filter((task) => task.id != id));
      })
      .finally(() => {
        setLoading(false);
      });
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
          minWidth: "50%",
          maxWidth: "80%",
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
            width: "100%",
          }}
        >
          {loading ? (
            <div style={{ height: "40vh" }}>
              <LoadingSpinner />
            </div>
          ) : (
            data.map((taskObj) => (
              <div
                key={taskObj.id}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0 1rem",
                }}
              >
                <TaskCard
                  task={taskObj}
                  onClick={() => {
                    handleUpdateTask({ ...taskObj, checked: !taskObj.checked });
                  }}
                  onUpdate={(taskObj) => {
                    handleUpdateTask(taskObj);
                  }}
                />

                <FontAwesomeIcon
                  icon={faTrash}
                  ref={iconRef}
                  style={{
                    width: "1.2rem",
                    height: "1.2rem",
                    color: "rgba(0,0,0,0.6)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(taskObj.id!)}
                />
              </div>
            ))
          )}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
