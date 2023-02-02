import { FC } from "react";
import { ISteamReviewComponent } from "../types/types";

const SteamReview: FC<ISteamReviewComponent> = ({ index, review }) => {
  const reviewRate = Math.round(Number(review.weighted_vote_score) * 100);
  const type = index === 0 ? "positive" : "negative";

  return (
    <div className="steam-review">
      <h2 className={"review-title " + type}>{type.toUpperCase()} REVIEW</h2>
      <p className="steam-rate-label">
        OBJECTIVITY: <span className="steam-rate">{reviewRate}%</span>
      </p>
      <p className="steam-date">
        {new Date(review.timestamp_created * 1000).toDateString()}
      </p>
      <div className="review-text">
        {review.review.split(". ").map((sentence) => (
          <p className="review-paragraph" key={Math.random()}>
            {sentence + "."}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SteamReview;
