import React from "react";
import { Alert } from "react-bootstrap";
import { useTheme } from "../context/theme-context"; // ✅ Import theme

interface ErrorAlertProps {
  error: string;
}

const ErrorAlertComponent: React.FC<ErrorAlertProps> = ({ error }) => {
  const { darkMode } = useTheme(); // ✅ Use dark mode

  if (!error) return null;

  return (
    <Alert
      variant={darkMode ? "dark" : "danger"}
      className={`mb-3 ${
        darkMode ? "border border-danger text-danger bg-dark" : ""
      }`}
      aria-live="assertive"
      role="alert"
    >
      {error}
    </Alert>
  );
};

export const ErrorAlert = React.memo(ErrorAlertComponent);
