import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  taskInput: string;
  setTaskInput: React.Dispatch<React.SetStateAction<string>>;
  onAddTask: (taskDescription: string) => void;
}

const TaskForm = ({ taskInput, setTaskInput, onAddTask }: TaskFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskInput.trim() !== "") {
      onAddTask(taskInput.trim());
    }
  };

  return (
    <div className={styles.taskForm}>
      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        type="text"
        placeholder="Add a new task..."
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon
        className={styles.icon}
        icon={faPlusCircle}
        onClick={() => {
          if (taskInput.trim() !== "") {
            onAddTask(taskInput);
          }
        }}
      />
    </div>
  );
};

export default TaskForm;
