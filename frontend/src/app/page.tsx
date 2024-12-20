"use client";

import { useEffect, useState } from "react";

import api from "./services/api";
import { TaskDTO } from "./constants/types";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

interface TaskFormData {
  description: string;
  checked: boolean;
  createdAt: Date;
}

export default function Home() {
  const [taskInput, setTaskInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TaskDTO[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    api
      .getAllTasks()
      .then((tasks) => setData(tasks))
      .finally(() => setLoading(false));
  };

  const handleUpdateTask = (updatedTask: TaskDTO) => {
    setLoading(true);
    api
      .updateTask(updatedTask.id!, updatedTask)
      .then(() => {
        setData((prevData) =>
          prevData.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    api
      .deleteTask(id)
      .then(() => {
        setData((prevData) => prevData.filter((task) => task.id !== id));
      })
      .finally(() => setLoading(false));
  };

  const handleAddTask = (taskDescription: string) => {
    setTaskInput("");
    const newTask: TaskFormData = {
      description: taskDescription,
      checked: false,
      createdAt: new Date(),
    };
    api.createTask(newTask).then(() => refreshData());
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

      <main style={{ minWidth: "50%", maxWidth: "80%" }}>
        <TaskForm
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          onAddTask={handleAddTask}
        />

        <TaskList
          loading={loading}
          tasks={data}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDelete}
        />
      </main>

      <footer></footer>
    </div>
  );
}
