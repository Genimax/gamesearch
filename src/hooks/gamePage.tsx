import { useState, useEffect } from "react";
import axios from "axios";

export default function useGamePage() {
  const [loadingGamePage, setLoadingPage] = useState(true);
  const [gameData, setGameData] = useState({});
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  useEffect(() => {
    const downloadPage = async () => {
      setLoadingPage(true);
      try {
        const gameInfo: any = await axios.get(
          `${process.env.REACT_APP_LOCALAPI}/gamepagerequest`,
          {
            params: {
              id: path.replace("/", ""),
            },
          }
        );
        setGameData(gameInfo.data[0]);
      } catch (e) {
        console.log(e);
      }

      setLoadingPage(false);
    };

    downloadPage();
  }, [path]);

  return { loadingGamePage, gameData };
}
