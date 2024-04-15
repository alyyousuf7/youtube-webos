import { useEffect } from 'react';

import { useConfiguration } from '../Config';

import { removeUsingJSONPath } from './utils';

const removeAdShelf = (data: Record<string, any>) => removeUsingJSONPath(data,
  '$..contents[?(@.adSlotRenderer)]',
);

const removeAdTiles = (data: Record<string, any>) => removeUsingJSONPath(data,
  '$..contents[*]..items[?(@.adSlotRenderer)]',
);

const removeAdPlacements = (data: Record<string, any>) => removeUsingJSONPath(data,
  '$.adPlacements[*]',
);

const removeShortsShelf = (data: Record<string, any>) => removeUsingJSONPath(data,
  '$..contents[?(@.shelfRenderer?.tvhtml5ShelfRendererType === "TVHTML5_SHELF_RENDERER_TYPE_SHORTS")]',
);

const useContentBlocker = () => {
  const { config } = useConfiguration();

  useEffect(() => {
    if (!window.jsonParseInterceptor || !config.removeAds) {
      return;
    }

    const removeInterceptorFns = [
      window.jsonParseInterceptor.addInterceptor(removeAdShelf),
      window.jsonParseInterceptor.addInterceptor(removeAdTiles),
      window.jsonParseInterceptor.addInterceptor(removeAdPlacements),
    ];
    return () => {
      for (const removeInterceptor of removeInterceptorFns) {
        removeInterceptor();
      }
    };
  }, [config.removeAds]);

  useEffect(() => {
    if (!window.jsonParseInterceptor || !config.removeShorts) {
      return;
    }

    const removeInterceptorFns = [
      window.jsonParseInterceptor.addInterceptor(removeShortsShelf),
    ];
    return () => {
      for (const removeInterceptor of removeInterceptorFns) {
        removeInterceptor();
      }
    };
  }, [config.removeShorts]);
};

export default useContentBlocker;
