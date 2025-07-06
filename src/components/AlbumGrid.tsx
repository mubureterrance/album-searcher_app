import React from "react";
import { Row, Col } from "react-bootstrap";
import type { SpotifyAlbum } from "../types/spotify";
import { AlbumCard } from "./AlbumCard";
import { useTheme } from "../context/theme-context";

interface AlbumGridProps {
  albums: SpotifyAlbum[];
  searchedArtist?: string; // Make optional since popular albums won't have this
  onAlbumClick: (album: SpotifyAlbum) => void;
  title?: string; // Allow custom title
  isPopular?: boolean; // Flag to indicate if these are popular albums
}

const AlbumGridComponent: React.FC<AlbumGridProps> = ({
  albums,
  searchedArtist,
  onAlbumClick,
  title,
  isPopular = false,
}) => {
  const { darkMode } = useTheme();

  if (albums.length === 0) return null;

  // Determine what title to show
  const getTitle = () => {
    if (title) return title;
    if (searchedArtist) return `Albums by ${searchedArtist} (${albums.length})`;
    if (isPopular) return `Popular New Releases (${albums.length})`;
    return null;
  };

  const displayTitle = getTitle();

  return (
    <>
      {displayTitle && (
        <h2 className={`mb-3 ${darkMode ? "text-light" : "text-dark"}`}>
          {displayTitle}
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