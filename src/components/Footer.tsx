// components/Footer.tsx
import React from "react";
import { Container } from "react-bootstrap";
import { useTheme } from "../context/theme-context";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`py-4 mt-auto border-top ${
        darkMode
          ? "bg-dark text-light border-secondary"
          : "bg-light text-dark border-light"
      }`}
    >
      <Container className="text-center small">
        <div>
          © {new Date().getFullYear()} Terrance Mubure. All rights reserved.
        </div>
        <div className="mt-2 d-flex justify-content-center gap-4">
          <a
            href="https://github.com/mubureterrance"
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center gap-1 text-decoration-none ${
              darkMode ? "text-light" : "text-dark"
            }`}
            title="GitHub"
          >
            <FaGithub size={18} />
            <span className="d-none d-sm-inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/terrance-mubure-90662370/"
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center gap-1 text-decoration-none ${
              darkMode ? "text-light" : "text-dark"
            }`}
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
            <span className="d-none d-sm-inline">LinkedIn</span>
          </a>
        </div>
      </Container>
    </footer>
  );
};
