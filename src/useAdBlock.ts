import { useEffect } from 'react';

import { useConfiguration } from './Config';

const originalJSONParse = JSON.parse;

const useAdBlock = () => {
  const { config } = useConfiguration();

  useEffect(() => {
    if (!config.adBlockEnabled) {
      return;
    }

    const overridedJSONParse = (text: string, ...args: any[]) => {
      const parsed = originalJSONParse(text, ...args);

      if (!parsed || typeof parsed !== 'object') {
        return parsed;
      }

      // remove in-video ads
      if (parsed.adPlacements) {
        parsed.adPlacements = [];
      }

      return parsed;
    };

    JSON.parse = overridedJSONParse;
    return () => {
      JSON.parse = originalJSONParse;
    };
  }, [config.adBlockEnabled]);

  return null;
};

export default useAdBlock;
