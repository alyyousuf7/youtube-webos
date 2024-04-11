import React, { useCallback } from 'react';

import CircularProgress from '@/components/ui/circular-progress';
import { useConfiguration } from '@/Config';
import { useRemoteKey } from '@/Remote';
import { RemoteKey } from '@/Remote/constants';
import RemoteKeyLabel from '@/Remote/RemoteKeyLabel';
import ProgressBarPortal from '@/YouTube/ProgressBarPortal';
import usePlayer from '@/YouTube/usePlayer';
import useVideoProgressBar from '@/YouTube/useVideoProgressBar';
import WatchPagePortal from '@/YouTube/WatchPagePortal';

import { SegmentCategoryLabels } from './constants';
import SegmentsProgressBar from './SegmentsProgressBar';
import useCurrentSegment from './useCurrentSegment';

import { useSponsorBlock } from '.';

const SponsorBlockOverlay = () => {
  const { player, videoEl } = usePlayer();
  const progressBar = useVideoProgressBar();
  const { loadingSegments, segments } = useSponsorBlock();
  const { currentSegment, countdown: segmentCountdown } = useCurrentSegment(segments, videoEl);
  const { config } = useConfiguration();

  useRemoteKey(RemoteKey.RED, 10, useCallback(() => {
    if (!player || !currentSegment) {
      return false;
    }
    player.seekTo(currentSegment.segment[1]);
    return true;
  }, [player, currentSegment]));

  if (!player || !videoEl || !config.sponsorBlockEnabled) {
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
        <WatchPagePortal>
          <div className="absolute right-0 m-2 rounded-full bg-black bg-opacity-50 pl-4 pr-2 py-2 text-center text-white">
            <span className="relative -top-3 mr-2">
              Press <RemoteKeyLabel remoteKey={RemoteKey.RED} /> to skip {SegmentCategoryLabels[currentSegment.category]}
            </span>
            <CircularProgress
              flipH
              value={segmentCountdown}
              max={currentSegment.segment[1] - currentSegment.segment[0]}
              getValueLabel={value => value > 60 ? `${Math.round(value / 60)}m` : `${Math.round(value)}s`}
            />
          </div>
        </WatchPagePortal>
      )}
    </>
  );
};

export default SponsorBlockOverlay;
