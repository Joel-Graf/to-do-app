import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>To Do App ;)</h1>
      <p className={styles.subtitle}>Stay organized, stay productive!</p>
    </header>
  );
}
