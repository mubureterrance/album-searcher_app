import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import type { SpotifyAlbum } from "./types/spotify";
import { useSpotifyAuth } from "./hooks/useSpotifyAuth";
import { useSpotifySearch } from "./hooks/useSpotifySearch";
import { usePopularAlbums } from "./hooks/usePopularAlbums";
import { SearchBar } from "./components/SearchBar";
import { ErrorAlert } from "./components/ErrorAlert";
import { AlbumGrid } from "./components/AlbumGrid";
import { AlbumModal } from "./components/AlbumModal";
import { useTheme } from "./context/theme-context";
import { Footer } from "./components/Footer";
import Header from "./components/Header";

function App(): JSX.Element {
  const { accessToken, authError } = useSpotifyAuth();
  const { albums, loading, error, searchedArtist, search, clearError } =
    useSpotifySearch(accessToken);
  const {
    albums: popularAlbums,
    loading: popularLoading,
    error: popularError,
  } = usePopularAlbums(accessToken);

  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const { darkMode, toggleTheme } = useTheme();

  const handleAlbumClick = (album: SpotifyAlbum): void => {
    setSelectedAlbum(album);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedAlbum(null);
  };

  const handleSearch = async (query: string): Promise<void> => {
    await search(query);
    setHasSearched(true);
  };

  const handleClearSearch = (): void => {
    setHasSearched(false);
    clearError();
  };

  // Determine which albums to show
  const showPopularAlbums = !hasSearched && albums.length === 0;
  const showSearchResults = hasSearched && albums.length > 0;

  return (
    <div
      className={`App d-flex flex-column ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh", transition: "all 0.3s ease" }}
    >
      <Container className="py-4">
        <div className="position-relative mb-4">
          <Header darkMode={darkMode} />
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
        </div>

        <SearchBar
          onSearch={handleSearch}
          loading={loading}
          onErrorClear={clearError}
          hasSearched={hasSearched}
          onClearSearch={handleClearSearch}
        />

        <ErrorAlert error={authError || error || popularError} />

        {/* Popular Albums (shown when no search has been performed) */}
        {showPopularAlbums && !popularLoading && (
          <AlbumGrid
            albums={popularAlbums}
            onAlbumClick={handleAlbumClick}
            isPopular={true}
          />
        )}

        {/* Search Results */}
        {showSearchResults && (
          <AlbumGrid
            albums={albums}
            searchedArtist={searchedArtist}
            onAlbumClick={handleAlbumClick}
          />
        )}

        {/* No Results Message */}
        {hasSearched && albums.length === 0 && !loading && (
          <div className="text-center py-4">
            <p className={darkMode ? "text-light" : "text-muted"}>
              No albums found. Try searching for a different artist.
            </p>
          </div>
        )}

        {/* Loading state for popular albums */}
        {popularLoading && !hasSearched && (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading popular albums...</span>
            </div>
            <p className={`mt-2 ${darkMode ? "text-light" : "text-dark"}`}>
              Loading popular albums...
            </p>
          </div>
        )}

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
