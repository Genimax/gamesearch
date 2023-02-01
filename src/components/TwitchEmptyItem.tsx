import { FC } from "react";

const TwitchEmptyItem: FC = () => {
  return (
    <div className="twitch-item-container empty-container">
      <p className="empty-stream-title">ONLY ON THE LEFT :(</p>
    </div>
  );
};

export default TwitchEmptyItem;
