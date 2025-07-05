import React, { useCallback } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import type { SpotifyAlbum } from "../types/spotify";
import { TrackList } from "./TrackList";
import { formatDate } from "../utils/format";
import { useAlbumTracks } from "../hooks/useAlbumTracks";
import { useTheme } from "../context/theme-context";

interface AlbumModalProps {
  show: boolean;
  album: SpotifyAlbum | null;
  accessToken: string;
  onClose: () => void;
}

export const AlbumModal: React.FC<AlbumModalProps> = ({
  show,
  album,
  accessToken,
  onClose,
}) => {
  const { darkMode } = useTheme();
  const albumId = album?.id || null;
  const { tracks, loading, error } = useAlbumTracks(albumId, accessToken);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!album) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      contentClassName={darkMode ? "bg-dark text-light" : "bg-white text-dark"} // ✅ Modal background
    >
      <Modal.Header
        closeButton
        className={darkMode ? "bg-dark text-light border-secondary" : ""}
      >
        <Modal.Title>
          {album && (
            <div className="d-flex align-items-center">
              <img
                src={album.images[0]?.url}
                alt={album.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "15px",
                }}
                className="rounded"
              />
              <div>
                <div>{album.name}</div>
                <small style={{ color: darkMode ? "#ccc" : "#6c757d" }}>
                  {formatDate(album.release_date)} • {album.total_tracks} tracks
                </small>
              </div>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
        {error && (
          <Alert variant={darkMode ? "danger" : "danger"} className="mb-3">
            {error}
          </Alert>
        )}
        <TrackList tracks={tracks} loading={loading} />
      </Modal.Body>
      <Modal.Footer
        className={darkMode ? "bg-dark text-light border-secondary" : ""}
      >
        <Button
          variant={darkMode ? "outline-light" : "secondary"}
          onClick={handleClose}
        >
          Close
        </Button>
        {album && (
          <Button
            variant={darkMode ? "success" : "success"}
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Album in Spotify
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
