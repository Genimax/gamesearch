export function useGameDescription(props: any) {
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
    if (data.involved_companies) {
      const companies = data.involved_companies.reverse().slice(0, 4);
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
        return Object.keys(allowedWebsites).includes(`${website.category}`);
      });

      if (filtered.length > 0) {
        return (
          <div className="links-container">
            {filtered.map((website: any) => {
              return (
                <div key={website.id}>
                  <a
                    className="link-container"
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="website-icon"
                      alt="website icon"
                      src={
                        "./icons/" + allowedWebsites[website.category] + ".png"
                      }
                    />
                    <p className="website-title">
                      {allowedWebsites[website.category].toUpperCase()}
                    </p>
                  </a>
                </div>
              );
            })}
            <br />
          </div>
        );
      } else return null;
    }
  };

  return { data, coverURL, date, rating, companiesRenderer, linksRenderer };
}
