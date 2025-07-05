// types/spotify.ts
export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  album_type: string;
  artists: SpotifyArtist[];
}

export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifySearchResponse {
  artists: {
    items: SpotifyArtist[];
  };
}

export interface SpotifyAlbumsResponse {
  items: SpotifyAlbum[];
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  track_number: number;
  duration_ms: number;
  explicit: boolean;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyAlbumTracksResponse {
  items: SpotifyTrack[];
  total: number;
}

export interface SpotifyError {
  error: {
    status: number;
    message: string;
  };
}