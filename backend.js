const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.listen(PORT, () => console.log("Server is running on port", PORT));

const tokenUpdater = async () => {
  // CHECK IF TOKEN IS EXPIRED
  if (Date.now() >= process.env.REACT_APP_TOKEN_LIFETIME_TILL) {
    const getTokenURL = process.env.REACT_APP_ACCESSTOKENLINK.replace(
      "[CLIENTID]",
      process.env.REACT_APP_CLIENTID
    ).replace("[CLIENTSECRET]", process.env.REACT_APP_CLIENTSECRET);

    // UPDATING TOKEN
    await fetch(getTokenURL, {
      method: "post",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        process.env.REACT_APP_TOKEN = response.access_token;
        process.env.REACT_APP_TOKEN_LIFETIME_TILL =
          Date.now() + response.expires_in * 1000;
      });
  }
};

const gameSearch = async (req, res) => {
  await tokenUpdater();

  const gameName = req.query.id;
  const DBURL = "https://api.igdb.com/v4/games";
  await fetch(DBURL, {
    method: "post",
    headers: {
      "Client-ID": process.env.REACT_APP_CLIENTID,
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
    body: `where (name ~ *"${gameName}"*); fields name; limit 10;`,
  })
    .then((response) => response.json())
    .then((response) => {
      res.send(response);
    });
};

app.get("/gamerequest", gameSearch);
