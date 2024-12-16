import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1>To-do-app ;)</h1>
      </header>
      <main>
        <h2>Add Task</h2>
        <div style={{ display: "flex" }}>
          <input type="text" />
          <FontAwesomeIcon style={{ width: "1rem" }} icon="plus-circle" />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
