import { FC } from "react";
import { IStreamProps } from "../types/types";

const TwitchItem: FC<IStreamProps> = ({ data }) => {
  const thumbnailsConstructor = (
    url: string,
    width: number,
    height: number
  ) => {
    return url
      .replace("{width}", width.toString())
      .replace("{height}", height.toString());
  };

  return (
    <a
      className="twitch-item-container"
      href={`https://twitch.tv/${data.user_name}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="stream-image-container">
        <p className="stream-live-sign">LIVE</p>
        <p className="stream-viewers-sign">{data.viewer_count} viewer(s)</p>
        <img
          alt="stream thumbnail"
          src={thumbnailsConstructor(data.thumbnail_url, 640, 360)}
          className="stream-thumbnail"
        />
      </div>
      <p className="stream-nickname">{data.user_name}</p>
      <div className="title-container">
        <p className="stream-title">{data.title}</p>
      </div>
    </a>
  );
};

export default TwitchItem;
