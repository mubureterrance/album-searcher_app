// hooks/useSpotifyAuth.ts
import { useState, useEffect, useCallback } from "react";
import type { SpotifyTokenResponse } from "../types/spotify";

const CLIENT_ID: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
const CLIENT_SECRET: string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || "";

export const useSpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const getAccessToken = useCallback(async (): Promise<string> => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Spotify credentials not configured");
    }

    const authParameters: RequestInit = {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    };

    try {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authParameters
      );
      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }
      const data: SpotifyTokenResponse = await response.json();
      return data.access_token;
    } catch (error) {
      throw new Error("Failed to authenticate with Spotify");
    }
  }, []);

  useEffect(() => {
    getAccessToken()
      .then(setAccessToken)
      .catch((error) => {
        console.error("Authentication error:", error);
        setAuthError("Failed to authenticate with Spotify API");
      });
  }, [getAccessToken]);

  return { accessToken, authError };
};