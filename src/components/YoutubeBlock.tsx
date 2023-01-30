import { useEffect, useState } from "react";
import youtube from "../api/youtube";
import YTVideoList from "./YTVideoList";

const YoutubeBlock = (props: any) => {
  const title = props.data.name;

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({ id: { videoId: "" } });

  useEffect(() => {
    const getVideos = async () => {
      const responce = await youtube.get("/search", {
        params: {
          q: title,
        },
      });

      setVideos(responce.data.items);
      setSelectedVideo(responce.data.items[0]);

      console.log(responce);
    };

    getVideos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="youtube-main-container">
      <h2 className="block-title">TOP 5 YOUTUBE VIDEOS:</h2>
      <div className="youtube-list-vs-player-container">
        <iframe
          className="youtube-player"
          width="637"
          height="360"
          src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="youtube-videos-list">
          {videos.length > 0 ? (
            <YTVideoList props={{ videos, setSelectedVideo }} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default YoutubeBlock;
