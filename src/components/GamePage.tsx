import PageLoader from "./PageLoader";
import GameDescription from "./GameDescription";
import GameImages from "./GameImages";
import useGamePage from "../hooks/gamePage";

const GamePage = () => {
  const { loadingGamePage, gameData } = useGamePage();

  function showPage() {
    if (loadingGamePage === true) {
      return <PageLoader />;
    }
    return (
      <div className="game-page-container hidden">
        <GameDescription data={gameData} />

        <div>
          <GameImages data={gameData} />
        </div>
      </div>
    );
  }

  return showPage();
};

export default GamePage;
