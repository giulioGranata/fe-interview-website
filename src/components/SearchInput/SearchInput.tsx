import { useCallback, useState } from "react";
import "./SearchInput.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = "Search by user name or email",
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange(newValue);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch();
      }
    },
    [onSearch],
  );

  const handleSearchClick = useCallback(() => {
    onSearch();
  }, [onSearch]);

  return (
    <div className="search-input">
      <label htmlFor="search-input" className="search-input__label text-label">
        WHAT ARE YOU LOOKING FOR?
      </label>
      <div className="search-input__wrapper">
        <div className="search-input__container">
          <input
            id="search-input"
            type="text"
            className="search-input__field"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search users by name"
          />
        </div>
        <button
          id="search-input-button"
          type="button"
          className="search-input__button"
          onClick={handleSearchClick}
          aria-label="Clear search and fetch results"
        >
          Search
        </button>
      </div>
    </div>
  );
}
