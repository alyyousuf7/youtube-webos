import { useEffect, useState } from 'react';

import { Segment } from './service';

const useCurrentSegment = (segments: Segment[] | null, videoEl: HTMLVideoElement | null) => {
  const [currentSegment, setCurrentSegment] = useState<Segment | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    if (!segments || !videoEl) {
      setCurrentSegment(null);
      setCountdown(0);
      return;
    }

    const onTimeUpdate = () => {
      const currentTime = videoEl.currentTime;
      const segment = segments.find(({ segment }) => currentTime >= segment[0] && currentTime <= segment[1]);

      setCurrentSegment(segment ?? null);
      setCountdown(segment ? segment.segment[1] - currentTime : 0);
    };

    videoEl.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      videoEl.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [segments, videoEl]);

  return {
    currentSegment,
    countdown,
  };
};

export default useCurrentSegment;
