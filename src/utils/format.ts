// utils/format.ts

/**
 * Format a date string to just the year (e.g. "2022")
 */
export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).getFullYear().toString();
  } catch {
    return dateString;
  }
};

/**
 * Convert milliseconds into m:ss duration format
 */
export const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
