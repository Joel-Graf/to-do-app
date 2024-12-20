import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingSpinnerProps {
  fontSize?: number;
}

const LoadingSpinner = ({ fontSize = 60 }: LoadingSpinnerProps) => {
  const spinnerStyle = {
    fontSize: fontSize,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <FontAwesomeIcon icon={faSpinner} spin style={spinnerStyle} />
    </div>
  );
};

export default LoadingSpinner;
