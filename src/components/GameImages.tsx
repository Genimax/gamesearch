import ImageGallery from "react-image-gallery";
import useLoadingElement from "../hooks/useLoadingElement";

interface Screenshots {
  id: Number;
  image_id: String;
  url: String;
}

const GameImages = (props: any) => {
  const { loadingStatus, setLoadingStatus } = useLoadingElement();

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
          thumbnailLoading: "lazy",
        };
      });
      return (
        <div className={loadingStatus ? "hidden" : ""} id="images_container">
          <h2 className="block-title">SCREENSHOTS: </h2>
          <ImageGallery
            showThumbnails={false}
            showPlayButton={false}
            onImageLoad={() => setLoadingStatus(false)}
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
