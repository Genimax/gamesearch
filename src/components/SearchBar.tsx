import React from "react";
import { useSearchbar } from "../hooks/searchbar";

interface SearchBarProps {
  defaultText: string;
  onGameChange: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  defaultText = "find your game",
  onGameChange,
}: SearchBarProps) => {
  const {
    ref,
    setOpen,
    onSearchTextChange,
    searchText,
    renderedList,
    gameList,
    handleKeyDown,
  } = useSearchbar(onGameChange);

  return (
    <div ref={ref} className="searchbar-container">
      <input
        onKeyDown={handleKeyDown}
        onClick={() => setOpen(true)}
        className="searchbar"
        onChange={onSearchTextChange}
        value={searchText}
        type="text"
        placeholder={defaultText}
      />
      <img src="./search.svg" alt="search icon" />
      {renderedList(gameList)}
    </div>
  );
};

export default SearchBar;
