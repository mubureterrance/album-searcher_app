import React from "react";
import { Row, Col } from "react-bootstrap";
import type { SpotifyAlbum } from "../types/spotify";
import { AlbumCard } from "./AlbumCard";
import { useTheme } from "../context/theme-context"; // ✅ Import theme

interface AlbumGridProps {
  albums: SpotifyAlbum[];
  searchedArtist: string;
  onAlbumClick: (album: SpotifyAlbum) => void;
}

const AlbumGridComponent: React.FC<AlbumGridProps> = ({
  albums,
  searchedArtist,
  onAlbumClick,
}) => {
  const { darkMode } = useTheme(); // ✅ Get darkMode

  if (albums.length === 0) return null;

  return (
    <>
      {searchedArtist && (
        <h2 className={`mb-3 ${darkMode ? "text-light" : "text-dark"}`}>
          Albums by {searchedArtist} ({albums.length})
        </h2>
      )}
      <Row className="g-4">
        {albums.map((album) => (
          <Col key={album.id} xs={12} sm={6} md={4} lg={3} className="d-flex">
            <AlbumCard album={album} onClick={onAlbumClick} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export const AlbumGrid = React.memo(AlbumGridComponent);