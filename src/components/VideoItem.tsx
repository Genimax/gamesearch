const VideoItem = ({ video, setSelectedVideo }: any) => {
  return (
    <div
      className="video-item-container"
      onClick={() => {
        setSelectedVideo(video);
      }}
    >
      <img
        alt="video cover"
        className="video-item-cover"
        src={video.snippet.thumbnails.medium.url}
      />

      <h3 className="video-item-title">
        {video.snippet.title
          .replace(/&quot;/g, '"')
          .replace("&#39;", "'")
          .replace("&amp;", "&")}
      </h3>
    </div>
  );
};

export default VideoItem;
