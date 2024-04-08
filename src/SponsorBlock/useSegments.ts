import { useEffect, useState } from 'react';

import { getSegments, getSegmentsPrivately, Segment, SegmentCategory } from './service';

const useSegments = (videoId: string | null, skipCategories: SegmentCategory[]) => {
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState<Segment[] | null>(null);

  useEffect(() => {
    if (!videoId || skipCategories.length === 0) {
      setLoading(false);
      setSegments(null);
      return;
    }

    async function effect(id: string) {
      setLoading(true);
      setSegments(null);
      try {
        const result = await getSegmentsPrivately(id, skipCategories)
          .catch(() => {
            console.warn('Failed to fetch segments privately, falling back to non-private API');
            return getSegments(id, skipCategories);
          });
        setSegments(result);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    effect(videoId);
  }, [videoId, skipCategories]);

  return { loading, segments };
};

export default useSegments;
