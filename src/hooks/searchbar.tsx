import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Advices from "../data/Advices";

export function useSearchbar(onGameChange: Function) {
  const [searchText, setSearchText] = useState("");
  const [requestText, setRequestText] = useState(searchText);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);

  const ref = React.useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < gameList.length - 1) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 40 && cursor === gameList.length - 1) {
      setCursor(0);
    }

    if (e.key === "Enter" && gameList.length > 0) {
      // const href = gameList[cursor]["id"];
      onGameSelect(gameList[cursor]);
      setCursor(-1);
    }

    if (e.key === "Escape") {
      setOpen(false);
      setCursor(-1);
    }
  };

  useEffect(() => {
    const onBodyClick = (e: any) => {
      if (ref.current?.contains(e.target)) {
        return;
      }
      setOpen(false);
      setCursor(-1);
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
    setOpen(true);
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
    if (searchText.length < 3) return null;
    const gamesElements = gameList.map((game: any, i: Number) => {
      return (
        <li
          className={`search-item ${
            cursor === i ? "search-item-active" : null
          }`}
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
        <div ref={ref} className="search-results">
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
    setSearchText(game.innerHTML);
    setAdvice(chooseAdvice());
    window.history.pushState({}, "", `/${game.id}`);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
    onGameChange(game.innerHTML);

    setOpen(false);
  };

  return {
    ref,
    setOpen,
    onSearchTextChange,
    searchText,
    renderedList,
    gameList,
    handleKeyDown,
  };
}
