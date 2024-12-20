import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  fontSize?: number;
}

const LoadingSpinner = ({ fontSize = 60 }: LoadingSpinnerProps) => {
  const spinnerStyle = {
    fontSize: fontSize,
  };

  return (
    <div className={styles.spinnerContainer}>
      <FontAwesomeIcon
        icon={faSpinner}
        className={styles.spinnerIcon}
        style={spinnerStyle}
      />
    </div>
  );
};

export default LoadingSpinner;
