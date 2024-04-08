import React, { useContext, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useConfiguration } from '@/Config';
import usePlayer from '@/YouTube/usePlayer';

import { SegmentCategoryLabels } from './constants';
import { Segment } from './service';
import useCurrentSegment from './useCurrentSegment';
import useSegments from './useSegments';

type SponsorBlockContext = {
  loadingSegments: boolean;
  segments: Segment[] | null;
};

const Context = React.createContext<SponsorBlockContext | null>(null);

export const useSponsorBlock = () => useContext(Context) as SponsorBlockContext;

export const SponsorBlockProvider = ({ children }: { children: React.ReactNode }) => {
  const { player, video, videoEl } = usePlayer();
  const { config } = useConfiguration();
  const { toast } = useToast();
  const { loading, segments } = useSegments(
    (config.sponsorBlockEnabled && !video?.isShort && video?.video_id) || null,
    config.sponsorBlockSkipCategories,
  );
  const currentSegment = useCurrentSegment(segments, videoEl);

  // auto skip segment
  useEffect(() => {
    if (!player || !videoEl || !currentSegment || !config.sponsorBlockAutoSkip) {
      return;
    }

    player.seekTo(currentSegment.segment[1]);
    toast({ description: `Skipped ${SegmentCategoryLabels[currentSegment.category]}` });
  }, [player, videoEl, currentSegment, config.sponsorBlockAutoSkip, toast]);

  const value: SponsorBlockContext = {
    loadingSegments: loading,
    segments,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
