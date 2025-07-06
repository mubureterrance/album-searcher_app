import React from 'react';

interface HeaderProps {
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  return (
    <div className="text-center mb-4">
      <h1 className="display-4 fw-bold text-primary mb-2">
        <i className="bi bi-music-note-list me-2"></i>
        Spotify Album Search
      </h1>
      <p className={`lead mb-0 ${darkMode ? "text-light" : "text-muted"}`}>
        Discover albums by your favorite artists
      </p>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <span className="badge bg-success me-2">
          <i className="bi bi-spotify"></i> Powered by Spotify
        </span>
        <span className={`small ${darkMode ? "text-light" : "text-muted"}`}>
          Search • Explore • Discover
        </span>
      </div>
    </div>
  );
};

export default Header;