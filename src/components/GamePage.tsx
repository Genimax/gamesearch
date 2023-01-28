import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "./PageLoader";
import GameDescription from "./GameDescription";

const GamePage = () => {
  const [loadingGamePage, setLoadingPage] = useState(true);
  const [gameData, setGameData] = useState({});
  const [path, setPath] = useState(window.location.pathname);
  const [hiddenClass, setHiddenClass] = useState("hidden");

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
    downloadPage();
  }, [path]);

  const gamePageRenderer: Function = (data: any) => {
    return (
      <>
        <GameDescription data={data} />
      </>
    );
  };

  function showPage() {
    if (loadingGamePage === true) {
      return <PageLoader />;
    }
    return (
      <div className="game-page-container hidden">
        {gamePageRenderer(gameData)}
      </div>
    );
  }

  return showPage();
};

export default GamePage;
