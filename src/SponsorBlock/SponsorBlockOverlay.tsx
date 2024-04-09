import React from 'react';

import { useConfiguration } from '@/Config';
import ProgressBarPortal from '@/YouTube/ProgressBarPortal';
import usePlayer from '@/YouTube/usePlayer';
import useVideoProgressBar from '@/YouTube/useVideoProgressBar';

import { SegmentCategoryLabels } from './constants';
import SegmentsProgressBar from './SegmentsProgressBar';
import useCurrentSegment from './useCurrentSegment';

import { useSponsorBlock } from '.';

const SponsorBlockOverlay = () => {
  const { player, videoEl } = usePlayer();
  const progressBar = useVideoProgressBar();
  const { loadingSegments, segments } = useSponsorBlock();
  const currentSegment = useCurrentSegment(segments, videoEl);
  const { config } = useConfiguration();

  if (!player || !config.sponsorBlockEnabled) {
    return null;
  }

  // TODO: Not to render the overlay if the video is in preview mode
  //   This makes the Skip button to stick when you exit full page video during a skip segment - which is not good
  // TODO: Not to render the overlay if the video is an ad (when AdBlock is not enabled)
  //   This makes the ad video to incorrectly have the skip segment overlay - which is incorrect

  return (
    <>
      {progressBar.type && (
        <ProgressBarPortal>
          <SegmentsProgressBar element={progressBar.element} loading={loadingSegments} segments={segments} />
        </ProgressBarPortal>
      )}
      {!config.sponsorBlockAutoSkip && currentSegment && (
        <button onClick={() => player.seekTo(currentSegment.segment[1])}>
          Skip {SegmentCategoryLabels[currentSegment.category]}
        </button>
      )}
    </>
  );
};

export default SponsorBlockOverlay;
