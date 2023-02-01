import { FC } from "react";
import { ISteamReviewComponent } from "../types/types";

const SteamReview: FC<ISteamReviewComponent> = ({ index, review }) => {
  const reviewRate = Math.round(Number(review.weighted_vote_score) * 100);
  const type = index === 0 ? "positive" : "negative";
  const reviewStatus = reviewRate < 60 ? "negative" : "positive";

  return (
    <div className="steam-review">
      <h2 className={"review-title " + type}>{type.toUpperCase()} REVIEW</h2>
      <p className="steam-rate-label">
        THIS USER RATED THIS GAME:{" "}
        <span className="steam-rate">{reviewRate}</span>/100
      </p>
      <p className="steam-date">
        {new Date(review.timestamp_created * 1000).toDateString()}
      </p>
      <div className="review-text">
        {review.review.split(". ").map((sentence) => (
          <p key={Math.random()}>{sentence + "."}</p>
        ))}
      </div>
    </div>
  );
};

export default SteamReview;