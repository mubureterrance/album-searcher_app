import React from "react";
import { ListGroup, Badge, Button, Spinner } from "react-bootstrap";
import type { SpotifyTrack } from "../types/spotify";
import { useTheme } from "../context/theme-context"; // ✅ Import theme
import { formatDuration } from "../utils/format";

interface TrackListProps {
  tracks: SpotifyTrack[];
  loading: boolean;
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, loading }) => {
  const { darkMode } = useTheme(); // ✅ Access darkMode

  if (loading) {
    return (
      <div className={`text-center py-4 ${darkMode ? "text-light" : "text-dark"}`}>
        <Spinner animation="border" />
        <p className="mt-2">Loading tracks...</p>
      </div>
    );
  }

  return (
    <ListGroup variant="flush">
      {tracks.map((track) => (
        <ListGroup.Item
          key={track.id}
          className={`d-flex justify-content-between align-items-center ${darkMode ? "bg-dark text-light border-secondary" : ""}`}
        >
          <div>
            <div className="fw-bold">
              {track.track_number}. {track.name}
              {track.explicit && (
                <Badge bg={darkMode ? "light" : "secondary"} className="ms-2 text-dark">
                  E
                </Badge>
              )}
            </div>
            <small style={{ color: darkMode ? "#ccc" : "#6c757d" }}>
              {formatDuration(track.duration_ms)}
            </small>
          </div>
          <div>
            {track.preview_url && (
              <Button
                variant={darkMode ? "outline-light" : "outline-primary"}
                size="sm"
                className="me-2"
                onClick={() => window.open(track.preview_url!, "_blank")}
              >
                Preview
              </Button>
            )}
            <Button
              variant={darkMode ? "outline-success" : "outline-success"}
              size="sm"
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
