import VideoItem from "./VideoItem";

const YTVideoList = ({ props }) => {
  const { videos, setSelectedVideo } = props;

  const renderVideoList = () => {
    return videos.map((video) => {
      return (
        <VideoItem
          video={video}
          setSelectedVideo={setSelectedVideo}
          key={video.id.videoId}
        />
      );
    });
  };

  return <>{renderVideoList()}</>;
};

export default YTVideoList;
