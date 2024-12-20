import { TaskDTO } from "@/app/constants/types";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import TaskCard from "../TaskCard/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./TaskList.module.css";

interface TaskListProps {
  loading: boolean;
  tasks: TaskDTO[];
  onUpdateTask: (task: TaskDTO) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList = ({
  loading,
  tasks,
  onUpdateTask,
  onDeleteTask,
}: TaskListProps) => {
  return (
    <div className={styles.taskList}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : (
        tasks.map((taskObj) => (
          <div key={taskObj.id} className={styles.taskItem}>
            <TaskCard
              task={taskObj}
              onClick={() =>
                onUpdateTask({ ...taskObj, checked: !taskObj.checked })
              }
              onUpdate={onUpdateTask}
            />

            <FontAwesomeIcon
              icon={faTrash}
              className={styles.trashIcon}
              onClick={() => onDeleteTask(taskObj.id!)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
