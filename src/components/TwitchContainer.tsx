import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ITwitchProps, ITwitchStreamData } from "../types/types";
import TwitchItem from "./TwitchItem";

const TwitchContainer: FC<ITwitchProps> = ({ id }) => {
  const [streamsList, setStreamsList] = useState<ITwitchStreamData[]>([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await axios.get<ITwitchStreamData[]>(
          process.env.REACT_APP_LOCALAPI + "/twitchstreams",
          {
            params: {
              id: id,
            },
          }
        );

        setStreamsList(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStreams();
  }, []);

  return streamsList.length > 0 ? (
    <>
      <h2 className="block-title">TOP 5 TWITCH TRANSLATIONS NOW:</h2>
      <div className="twitch-streams-container">
        {streamsList.map((streamData) => (
          <TwitchItem key={streamData.id} data={streamData} />
        ))}
      </div>
    </>
  ) : null;
};

export default TwitchContainer;
