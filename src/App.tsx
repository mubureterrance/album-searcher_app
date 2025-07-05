import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import type { SpotifyAlbum } from "./types/spotify";
import { useSpotifyAuth } from "./hooks/useSpotifyAuth";
import { useSpotifySearch } from "./hooks/useSpotifySearch";
import { SearchBar } from "./components/SearchBar";
import { ErrorAlert } from "./components/ErrorAlert";
import { AlbumGrid } from "./components/AlbumGrid";
import { AlbumModal } from "./components/AlbumModal";
import { useTheme } from "./context/theme-context";
import { Footer } from "./components/Footer";


function App(): JSX.Element {
  const { accessToken, authError } = useSpotifyAuth();
  const { albums, loading, error, searchedArtist, search, clearError } =
    useSpotifySearch(accessToken);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { darkMode, toggleTheme } = useTheme();

  const handleAlbumClick = (album: SpotifyAlbum): void => {
    setSelectedAlbum(album);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedAlbum(null);
  };

  return (
    <div
      className={`App d-flex flex-column ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ minHeight: "100vh", transition: "all 0.3s ease" }}
    >
      <Container className="py-4">
        <div className="position-relative mb-4">
          <h1 className="text-center">Spotify Album Search by Artist</h1>
          <div className="position-absolute top-0 end-0">
            <Button
              variant={darkMode ? "light" : "dark"}
              onClick={toggleTheme}
              title="Toggle dark mode"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </Button>
          </div>
        </div>

        <SearchBar
          onSearch={search}
          loading={loading}
          onErrorClear={clearError}
        />

        <ErrorAlert error={authError || error} />

        <AlbumGrid
          albums={albums}
          searchedArtist={searchedArtist}
          onAlbumClick={handleAlbumClick}
        />

        <AlbumModal
          show={showModal}
          album={selectedAlbum}
          accessToken={accessToken}
          onClose={handleCloseModal}
        />
      </Container>

      <Footer />
    </div>
  );
}

export default App;
