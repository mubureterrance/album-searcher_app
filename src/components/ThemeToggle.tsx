import { Button } from "react-bootstrap";
import { useTheme } from "../context/theme-context";

export const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <Button
        variant={darkMode ? "light" : "dark"}
        size="sm"
        onClick={toggleTheme}
        title={`Switch to ${darkMode ? "light" : "dark"} mode`}
        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        className="d-flex align-items-center gap-2 shadow border-2 fw-semibold"
        style={{
          borderRadius: '50px',
          transition: 'all 0.3s ease',
          border: `2px solid ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
          backgroundColor: darkMode ? '#f8f9fa' : '#212529',
          color: darkMode ? '#212529' : '#f8f9fa'
        }}
      >
        <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`} aria-hidden="true"></i>
        <span className="d-none d-sm-inline">
          {darkMode ? "Light" : "Dark"}
        </span>
      </Button>
    </div>
  );
};