import { useEffect, useRef } from 'react';

import usePlayer from './usePlayer';

const useAutoPauseVideo = (resumeVideo?: boolean) => {
  const { player, videoEl } = usePlayer();
  const playerState = useRef<'playing' | 'paused'>('playing');

  useEffect(() => {
    if (!player || !videoEl) {
      return;
    }

    if (resumeVideo) {
      playerState.current = videoEl.paused ? 'paused' : 'playing';
      player.pauseVideo();
    }
    else if (playerState.current === 'playing') {
      player.playVideo();
    }
  }, [resumeVideo, player, videoEl]);
};

export default useAutoPauseVideo;
