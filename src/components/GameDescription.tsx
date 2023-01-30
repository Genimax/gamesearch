import { useGameDescription } from "../hooks/gameDescription";

const GameDescription = (props: any) => {
  const { data, coverURL, date, rating, companiesRenderer, linksRenderer } =
    useGameDescription(props);

  try {
    console.log(data);
    return (
      <div className={"game-description"}>
        <img
          className="game-cover"
          onLoad={() => {
            document
              .querySelector(".game-page-container")!
              .classList.remove("hidden");
          }}
          alt="cover"
          src={coverURL}
        />
        <div className="game-text-container">
          <h1 className="game-title">{data.name}</h1>
          <div className="game-summary">
            <p
              className={data.summary ? "game-desc-text" : "empty-placeholder"}
            >
              {data.summary || "No description, but you hold on"}
            </p>
          </div>
        </div>
        <div className="stats-n-links-container">
          <div className="stats-date-n-devs-vs-rate">
            <div className="date-n-devs-container">
              <div className="date-container">
                <h2 className="date-n-devs-label">RELEASE DATE:</h2>
                <p className="date-n-devs-value">{date}</p>
              </div>
              <div>
                <h2 className="date-n-devs-label">DEVELOPER(S):</h2>
                <div>{companiesRenderer()}</div>
              </div>
            </div>
            <div className="rate-container ">
              <h2 className="rate-label">RATE</h2>
              <div
                className="rate-circle neonText"
                style={{
                  filter: `grayscale(${!isNaN(rating) ? 100 - rating : 100}%)`,
                }}
              >
                <p className="rating-text">{rating || "None"}</p>
              </div>
            </div>
          </div>
          {linksRenderer()}
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return (
      <div className="error-game-page">
        O_o ps: We Couldn't find this game :(
      </div>
    );
  }
};

export default GameDescription;
