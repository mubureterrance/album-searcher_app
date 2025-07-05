import { useState, useEffect, useCallback } from "react";
import type { SpotifyTrack, SpotifyError, SpotifyAlbumTracksResponse } from "../types/spotify";

export function useAlbumTracks(albumId: string | null, accessToken: string) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchTracks = useCallback(async () => {
    if (!albumId || !accessToken) {
      setTracks([]);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}/tracks?market=US&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData: SpotifyError = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data: SpotifyAlbumTracksResponse = await response.json();
      setTracks(data.items);
    } catch (err: any) {
      setError(err.message || "Failed to load tracks.");
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }, [albumId, accessToken]);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return { tracks, loading, error };
}
