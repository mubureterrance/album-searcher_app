// hooks/usePopularAlbums.ts
import { useState, useEffect, useCallback } from "react";
import type { SpotifyAlbum, SpotifyError } from "../types/spotify";

interface NewReleasesResponse {
  albums: {
    items: SpotifyAlbum[];
    total: number;
    limit: number;
    offset: number;
  };
}

export const usePopularAlbums = (accessToken: string) => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPopularAlbums = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get new releases (often includes popular content)
      const response = await fetch(
        "https://api.spotify.com/v1/browse/new-releases?country=US&limit=20",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData: SpotifyError = await response.json();
        throw new Error(
          errorData.error?.message || `HTTP ${response.status}`
        );
      }

      const data: NewReleasesResponse = await response.json();
      setAlbums(data.albums.items);
    } catch (err: any) {
      console.error("Failed to fetch popular albums:", err);
      setError(err.message || "Failed to load popular albums");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchPopularAlbums();
  }, [fetchPopularAlbums]);

  return { albums, loading, error, refetch: fetchPopularAlbums };
};