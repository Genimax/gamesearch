import React, { useEffect, useState } from "react";
import axios from "axios";

interface SearchBarProps {
  defaultText?: string;
  onGameChange?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  defaultText = "find your game",
  onGameChange,
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [requestText, setRequestText] = useState(searchText);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});

  const [open, setOpen] = useState(false);

  const ref = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onBodyClick = (e: any) => {
      if (ref.current?.contains(e.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const onSearchTextChange = (e: any): void => {
    setSearchText(e.target.value);
  };

  useEffect(() => {}, [open]);

  useEffect(() => {
    setLoadingStatus(true);
    if (searchText.length < 3) setGameList([]);
    const searchTimeout = setTimeout(() => {
      setRequestText(searchText);
    }, 500);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (requestText) {
      setLoadingStatus(true);
      (async () => {
        const games: any = await axios.get(
          `http://localhost:8000/gamerequest`,
          {
            params: {
              id: requestText,
            },
          }
        );
        setGameList(games.data);
        setLoadingStatus(false);
      })();
    }
  }, [requestText]);

  const renderedList = (gameList: any) => {
    if (searchText.length < 3 || selectedGame === searchText) return null;
    const gamesElements = gameList.map((game: any) => {
      return (
        <li
          className="search-item"
          onClick={(e) => {
            onGameSelect(e.currentTarget);
          }}
          key={game.id}
          id={game.id}
        >
          {game.name}
        </li>
      );
    });
    if (!open) return null;
    if (loadingStatus === false && gameList.length > 0)
      return (
        <div className="search-results">
          <ul id="results">{gamesElements}</ul>
        </div>
      );
    else if (loadingStatus === false && gameList.length === 0) {
      return (
        <div className="search-results">
          <p id="error-text">Sorry, we couldn't find anything :(</p>
        </div>
      );
    } else
      return (
        <div className="search-results">
          <img src="./loading.png" id="loading-icon" alt="loading" />
          <p id="loading-text">Loading...</p>
        </div>
      );
  };

  const onGameSelect = (game: any) => {
    window.history.pushState({}, "", `/${game.id}`);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
    setSelectedGame(game.innerHTML);
    onGameChange(game.innerHTML);
    setSearchText("");
  };

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
