import { FC } from "react";

import PageLoader from "./PageLoader";
import GameDescription from "./GameDescription";
import GameImages from "./GameImages";
import useGamePage from "../hooks/gamePage";
import YoutubeBlock from "./YoutubeBlock";
import TwitchContainer from "./TwitchContainer";
import SteamContainer from "./SteamContainer";
import Header from "./Header";

const GamePage: FC = () => {
  const { loadingGamePage, gameData } = useGamePage();
  const [data] = gameData;

  function showPage() {
    if (loadingGamePage === true) {
      return <PageLoader />;
    }
    return (
      <>
        <Header />
        <div className="game-page-container hidden">
          <GameDescription data={data} />

          <div className="yt-screenshots-container parent-container">
            <YoutubeBlock data={data} />
            <GameImages data={data} />
          </div>
          <TwitchContainer id={data.id} />
          {data.websites ? <SteamContainer websites={data.websites} /> : null}
        </div>
      </>
    );
  }

  try {
    return showPage();
  } catch {
    return (
      <div className="error-game-page">
        O_o ps: we couldn't find this game :(
      </div>
    );
  }
};

export default GamePage;
