import { useEffect, useState } from 'react';

import { Segment } from './service';

const useCurrentSegment = (segments: Segment[] | null, videoEl: HTMLVideoElement | null) => {
  const [currentSegment, setCurrentSegment] = useState<Segment | null>(null);

  useEffect(() => {
    if (!segments || !videoEl) {
      return;
    }

    const onTimeUpdate = () => {
      const currentTime = videoEl.currentTime;
      const segment = segments.find(({ segment }) => currentTime >= segment[0] && currentTime <= segment[1]);

      setCurrentSegment(segment ?? null);
    };

    videoEl.addEventListener('timeupdate', onTimeUpdate);
    return () => {
      videoEl.removeEventListener('timeupdate', onTimeUpdate);
    };
  });

  return currentSegment;
};

export default useCurrentSegment;
