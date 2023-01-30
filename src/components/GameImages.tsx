import React from "react";
import ImageGallery from "react-image-gallery";

interface Screenshots {
  id: Number;
  image_id: String;
  url: String;
}

const GameImages = (props: any) => {
  const data = props.data;

  const galleryConstructor = () => {
    if (data.screenshots) {
      const images = data.screenshots.map((screenshot: Screenshots) => {
        const imageOriginalURL = screenshot.url.replace(
          "thumb",
          "screenshot_huge"
        );
        const imageThumbnailURL = screenshot.url.replace(
          "thumb",
          "screenshot_med"
        );

        return {
          original: imageOriginalURL,
          thumbnail: imageThumbnailURL,
        };
      });
      return (
        <div className="hidden" id="images_container">
          <h2 className="screenshots-title">SCREENSHOTS: </h2>
          <ImageGallery
            showThumbnails={false}
            showPlayButton={false}
            isRTL={true}
            onImageLoad={() => {
              document
                .getElementById("images_container")
                ?.classList.remove("hidden");
            }}
            items={images}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return <>{galleryConstructor()}</>;
};

export default GameImages;
