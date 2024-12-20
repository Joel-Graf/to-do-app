import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Joel Marcos Graf
        <a
          href="https://www.linkedin.com/in/joel-m-graf/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className={styles.icon}
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://github.com/Joel-Graf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className={styles.icon}
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </footer>
  );
}
