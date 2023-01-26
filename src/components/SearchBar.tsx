import React, { useEffect, useState } from "react";
import axios from "axios";

interface SearchBarProps {
  defaultText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  defaultText = "find your game",
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [requestText, setRequestText] = useState(searchText);
  const [gameList, setGameList] = useState([]);

  const onSearchTextChange = (e: any): void => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setRequestText(searchText);
    }, 200);
    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (requestText) {
      (async () => {
        const games: any = await axios.get(
          `http://localhost:8000/gamerequest`,
          {
            params: {
              id: requestText,
            },
          }
        );
        setGameList(games);
        console.log(games);
      })();
    }
  }, [requestText]);

  return (
    <div className="searchbar-container">
      <input
        className="searchbar"
        onChange={onSearchTextChange}
        value={searchText}
        type="text"
        placeholder={defaultText}
      />
      <img src="./search.svg" alt="search icon" />
    </div>
  );
};

export default SearchBar;
