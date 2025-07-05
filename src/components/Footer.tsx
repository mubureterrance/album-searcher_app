// components/Footer.tsx
import React from "react";
import { Container } from "react-bootstrap";
import { useTheme } from "../context/theme-context";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <footer className={`py-4 mt-auto ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Container className="text-center small">
        <div>© {new Date().getFullYear()} Terrance Mubure. All rights reserved.</div>
        <div className="mt-2 d-flex justify-content-center gap-4">
          <a
            href="https://github.com/mubureterrance"
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center gap-1 ${darkMode ? "text-light" : "text-dark"}`}
            title="GitHub"
          >
            <FaGithub size={18} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/terrance-mubure-90662370/"
            target="_blank"
            rel="noopener noreferrer"
            className={`d-flex align-items-center gap-1 ${darkMode ? "text-light" : "text-dark"}`}
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
};
