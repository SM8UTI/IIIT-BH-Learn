/* eslint-disable react/prop-types */
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayer = ({ videoSrc }) => {
  const plyrProps = {
    source: {
      type: "video",
      sources: [
        {
          src: videoSrc,
          type: "video/mp4",
        },
      ],
    },
    options: {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed"],
    },
  };

  return (
    <div className=" bg-gray-800 rounded-lg overflow-hidden">
      <Plyr {...plyrProps} />
    </div>
  );
};

export default VideoPlayer;
