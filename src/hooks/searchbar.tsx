import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Advices from "../data/Advices";

export function useSearchbar(onGameChange: Function) {
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

  const chooseAdvice = (): String => {
    const choice: number = Math.floor(Math.random() * Advices.length);

    return Advices[choice];
  };

  const [advice, setAdvice] = useState(chooseAdvice());

  useEffect(() => {
    if (requestText) {
      setLoadingStatus(true);

      (async () => {
        const games: any = await axios.get(
          `${process.env.REACT_APP_LOCALAPI}/gamerequest`,
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
    } else return <Loading advice={advice} />;
  };

  const onGameSelect = (game: any) => {
    setAdvice(chooseAdvice());
    window.history.pushState({}, "", `/${game.id}`);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
    setSelectedGame(game.innerHTML);
    onGameChange(game.innerHTML);
    setSearchText("");
  };

  return {
    ref,
    setOpen,
    onSearchTextChange,
    searchText,
    renderedList,
    gameList,
  };
}
