import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  taskInput: string;
  setTaskInput: React.Dispatch<React.SetStateAction<string>>;
  onAddTask: (taskDescription: string) => void;
}

const TaskForm = ({ taskInput, setTaskInput, onAddTask }: TaskFormProps) => {
  const iconRef = useRef<SVGSVGElement>(null);

  return (
    <div className={styles.taskForm}>
      <input
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        type="text"
      />
      <FontAwesomeIcon
        className={styles.icon}
        icon={faPlusCircle}
        ref={iconRef}
        onClick={() => onAddTask(taskInput)}
        onMouseEnter={() =>
          (iconRef.current!.style.boxShadow = "0 4px 8px 0px rgba(0,0,0,0.2)")
        }
        onMouseLeave={() =>
          (iconRef.current!.style.boxShadow = "0 2px 4px 0px rgba(0,0,0,0.2)")
        }
      />
    </div>
  );
};

export default TaskForm;
