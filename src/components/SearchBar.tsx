import { useSearchbar } from "../hooks/searchbar";

interface SearchBarProps {
  defaultText?: string;
  onGameChange?: any;
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
  } = useSearchbar(onGameChange);

  return (
    <div ref={ref} className="searchbar-container">
      <input
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
