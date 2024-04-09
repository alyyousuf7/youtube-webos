import React, { useLayoutEffect, useState } from 'react';

import { SegmentCategoryColors } from './constants';
import { Segment } from './service';

type SegmentsProgressBarProps = {
  element: Element;
  loading: boolean;
  segments: Segment[] | null;
};

const SegmentsProgressBar: React.FC<SegmentsProgressBarProps> = ({ element, loading, segments }) => {
  const [size, setSize] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    setSize(element.getBoundingClientRect());

    const observer = new ResizeObserver((entries) => {
      if (!entries.some(entry => entry.target === element)) {
        return;
      }
      setSize(element.getBoundingClientRect());
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element]);

  if (!size) {
    return null;
  }

  const { width, height } = size;

  return (
    <div data-segments-progress-bar style={{ width, height, opacity: 0.7 }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.2,
            background: `repeating-linear-gradient(
              -55deg,
              rgba(0,0,0,0),
              rgba(0,0,0,0) 10px,
              #000 10px,
              #000 20px
            )`,
          }}
        />
      )}

      {/* TODO: Fix segments height for Chapter progress bar when user is seeking the video */}
      {!loading && segments && segments.map(({ segment, videoDuration, category, actionType }, index) => (
        <div
          key={index}
          data-segment={category}
          data-action-type={actionType}
          style={{
            position: 'absolute',
            top: 0,
            left: `${segment[0] / videoDuration * width}px`,
            width: `${(segment[1] - segment[0]) / videoDuration * width}px`,
            height: '100%',
            backgroundColor: SegmentCategoryColors[category],
          }}
        />
      ))}
    </div>
  );
};

export default SegmentsProgressBar;
