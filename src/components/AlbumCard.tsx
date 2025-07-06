import React from "react";
import { Card, Button } from "react-bootstrap";
import type { SpotifyAlbum } from "../types/spotify";
import { useTheme } from "../context/theme-context";
import { formatDate } from "../utils/format";

interface AlbumCardProps {
  album: SpotifyAlbum;
  onClick: (album: SpotifyAlbum) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
  const { darkMode } = useTheme();

  return (
    <Card
      className={`w-100 shadow-sm h-100 ${
        darkMode ? "bg-dark text-light" : "bg-white text-dark"
      }`}
      style={{ cursor: "pointer" }}
      onClick={() => onClick(album)}
    >
      <Card.Img
        variant="top"
        src={album.images[0]?.url || "/placeholder-album.png"}
        alt={`${album.name} album cover`}
        style={{
          height: "300px",
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" title={album.name}>
          {album.name}
        </Card.Title>
        <Card.Text
          className="small mb-2"
          style={{ color: darkMode ? "#ccc" : "#6c757d" }}
        >
          {formatDate(album.release_date)} • {album.total_tracks} tracks
        </Card.Text>
        <Card.Text
          className="small mb-2"
          style={{ color: darkMode ? "#ccc" : "#6c757d" }}
        >
          Click to view track list
        </Card.Text>
        <div className="mt-auto">
          <Button
            variant={darkMode ? "outline-light" : "outline-success"}
            size="sm"
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="w-100"
            onClick={(e) => e.stopPropagation()}
          >
            Open in Spotify
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
