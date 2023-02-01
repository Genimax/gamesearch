import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ISteamReviewData, ISteamReviewsProp } from "../types/types";
import SteamReview from "./SteamReview";

interface ISteamResponse {
  reviews: ISteamReviewData[];
}

const SteamContainer: FC<ISteamReviewsProp> = ({ websites }) => {
  const [reviewsContainer, setReviewsContainer] = useState<ISteamReviewData[]>(
    []
  );
  const [steamID, setSteamID] = useState("");

  useEffect(() => {
    const steamURL = websites?.filter((website) => website.category === 13)[0];

    if (steamURL) {
      setSteamID(
        steamURL?.url.replace("https://store.steampowered.com/app/", "")
      );
    }

    const getReview = async () => {
      const review = await axios<ISteamResponse[]>(
        process.env.REACT_APP_LOCALAPI + "/steamreviews",
        {
          params: {
            steamID,
          },
        }
      );

      const [positiveReviewResponce, negativeReviewResponce] = review.data;

      setReviewsContainer([
        positiveReviewResponce.reviews[0],
        negativeReviewResponce.reviews[0],
      ]);
    };

    if (steamID) {
      getReview();
    }
  }, [steamID, websites]);

  const createReviewComponents = () => {
    return reviewsContainer.map((review) => (
      <SteamReview
        key={review.timestamp_created}
        review={review}
        index={reviewsContainer.indexOf(review) === 0 ? 0 : 1}
      />
    ));
  };

  if (reviewsContainer.length === 0) return null;

  return (
    <div className={"parent-conainer"}>
      <h2 className="block-title">STEAM REVIEWS:</h2>
      <div className="steam-review-container">
        {reviewsContainer.length > 0 ? createReviewComponents() : null}
      </div>
    </div>
  );
};
export default SteamContainer;
