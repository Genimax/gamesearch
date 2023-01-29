const GameDescription = (props: any) => {
  try {
    const data = props.data;

    const coverURL = `https:${data.cover.url.replace("thumb", "cover_big")}`;

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = data.first_release_date
      ? new Date(data.first_release_date * 1000).toLocaleDateString(
          "en-US",
          dateOptions
        )
      : "None";
    const rating = Math.floor(data.total_rating);

    const companiesRenderer = () => {
      const companies = data.involved_companies;

      if (companies) {
        return companies.map((company: any) => {
          return (
            <p className="date-n-devs-value" key={company.id}>
              {company.company.name}
            </p>
          );
        });
      } else {
        return <p className="date-n-devs-value">-</p>;
      }
    };

    const linksRenderer = () => {
      const allowedWebsites: any = {
        1: "Official Website",
        6: "Twitch",
        9: "Youtube",
        13: "Steam",
        18: "Discord",
      };

      if (data.websites) {
        const filtered = data.websites.filter((website: any) => {
          return (
            Object.keys(allowedWebsites).includes(`${website.category}`) &&
            website.trusted
          );
        });

        if (filtered.length > 0) {
          return (
            <div className="links-container">
              {filtered.map((website: any) => {
                return (
                  <div key={website.id}>
                    <a className="link-container" href={website.url}>
                      <img
                        className="website-icon"
                        alt="website icon"
                        src={
                          "./icons/" +
                          allowedWebsites[website.category] +
                          ".png"
                        }
                      />
                      <p className="website-title">
                        {allowedWebsites[website.category].toUpperCase()}
                      </p>
                    </a>
                  </div>
                );
              })}
            </div>
          );
        } else return null;
      }
    };

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
            <p>{data.summary}</p>
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
