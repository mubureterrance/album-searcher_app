import React, { useState, useCallback } from "react";
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { useTheme } from "../context/theme-context"; // ✅ Import theme

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
  onErrorClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading,
  onErrorClear,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { darkMode } = useTheme(); // ✅ Access darkMode

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = searchInput.trim();
      if (trimmed) {
        onSearch(trimmed);
      }
    },
    [searchInput, onSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchInput("");
    onErrorClear();
  }, [onErrorClear]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      onErrorClear();
    },
    [onErrorClear]
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3" size="lg">
        <FormControl
          aria-label="Artist name"
          placeholder="Search for an artist..."
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          disabled={loading}
          className={darkMode ? "bg-dark text-light border-secondary" : ""}
          autoComplete="off"
        />
        {searchInput && (
          <Button
            aria-label="Clear search"
            variant={darkMode ? "outline-light" : "outline-secondary"}
            onClick={clearSearch}
            disabled={loading}
            title="Clear search"
          >
            ×
          </Button>
        )}
        <Button
          variant={darkMode ? "light" : "primary"}
          type="submit"
          disabled={loading || !searchInput.trim()}
          aria-disabled={loading || !searchInput.trim()}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Search"}
        </Button>
      </InputGroup>
    </form>
  );
};
