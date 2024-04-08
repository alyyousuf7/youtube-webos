import { useEffect, useRef, useState } from 'react';

import useElementObserver from '../useElementObserver';

// VideoData is a type that represents the data received from YouTube's API.
type VideoData = {
  video_id: string;
  isLive: boolean;
};

// Video is a type that represents the data received from YouTube's API with additional information.
export type Video = VideoData & {
  isShort: boolean;
};

export type Player = Element & {
  seekTo: (time: number) => void;
  seekBy: (duration: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  getVideoData: () => VideoData;
};

// usePlayer returns the global player container and the video data from the player.
//
// YouTube uses the same player container for videos and shorts on all pages.
const usePlayer = () => {
  const player = useElementObserver<Player>('#ytlr-player__player-container-player');
  const [video, setVideo] = useState<Video | null>(null);
  const videoEl = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!player) {
      return;
    }

    const onMutation: MutationCallback = (mutations) => {
      videoEl.current = player.querySelector('video');
      // this should never happen, but just in case
      if (!videoEl.current) {
        setVideo(null);
        return;
      }

      // check if the mutation is related to the video src attribute
      if (!mutations.some(({ target, type, attributeName }) =>
        target === videoEl.current && type === 'attributes' && attributeName === 'src',
      )) {
        return;
      }

      // if the video element has a src attribute, then we can get the video data from the player
      if (videoEl.current.getAttribute('src')) {
        setVideo({
          // This is a hacky way to determine if the video is a YouTube Shorts video.
          isShort: document.querySelector('.ytlr-shorts-page--focused') !== null,
          ...player.getVideoData(),
        });
      }
      else {
        setVideo(null);
      }
    };

    const observer = new MutationObserver(onMutation);
    observer.observe(player, { attributes: true, subtree: true });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [player]);

  return { player, video, videoEl: video ? videoEl.current : null };
};

export default usePlayer;
