// hooks/useSpotifySearch.ts
import { useState, useCallback } from "react";
import type { SpotifyAlbum, SpotifySearchResponse, SpotifyAlbumsResponse, SpotifyError } from "../types/spotify";

export const useSpotifySearch = (accessToken: string) => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchedArtist, setSearchedArtist] = useState<string>("");

  const handleApiError = (error: any, context: string): void => {
    console.error(`${context}:`, error);
    if (error.message?.includes("Failed to fetch")) {
      setError("Network error. Please check your connection and try again.");
    } else {
      setError(`${context}: ${error.message || "Unknown error occurred"}`);
    }
  };

  const search = useCallback(async (searchInput: string): Promise<void> => {
    if (!searchInput.trim()) {
      setError("Please enter an artist name");
      return;
    }

    if (!accessToken) {
      setError("Not authenticated. Please wait and try again.");
      return;
    }

    setLoading(true);
    setError("");
    setAlbums([]);

    try {
      // Get artist ID
      const artistResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchInput
        )}&type=artist&limit=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!artistResponse.ok) {
        const errorData: SpotifyError = await artistResponse.json();
        throw new Error(
          errorData.error?.message || `HTTP ${artistResponse.status}`
        );
      }

      const artistData: SpotifySearchResponse = await artistResponse.json();

      if (!artistData.artists.items.length) {
        setError(`No artist found for "${searchInput}"`);
        return;
      }

      const artist = artistData.artists.items[0];
      const artistId = artist.id;
      setSearchedArtist(artist.name);

      // Get albums
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!albumsResponse.ok) {
        const errorData: SpotifyError = await albumsResponse.json();
        throw new Error(
          errorData.error?.message || `HTTP ${albumsResponse.status}`
        );
      }

      const albumsData: SpotifyAlbumsResponse = await albumsResponse.json();

      // Remove duplicates and sort by release date
      const uniqueAlbums = albumsData.items.filter(
        (album, index, self) =>
          index ===
          self.findIndex(
            (a) => a.name.toLowerCase() === album.name.toLowerCase()
          )
      );

      const sortedAlbums = uniqueAlbums.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );

      setAlbums(sortedAlbums);

      if (sortedAlbums.length === 0) {
        setError(`No albums found for "${artist.name}"`);
      }
    } catch (error) {
      handleApiError(error, "Search failed");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const clearError = () => setError("");

  return { albums, loading, error, searchedArtist, search, clearError };
};