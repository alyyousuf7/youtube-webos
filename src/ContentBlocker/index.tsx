import { useEffect } from 'react';

import { HTTPMethod, URLPattern } from '@/HTTPInterceptor';

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

type RequestPattern = { method: HTTPMethod; urlPattern: URLPattern };

const BrowseGetRequest: RequestPattern = { method: 'GET', urlPattern: '/youtubei/v1/browse' };
const BrowsePostRequest: RequestPattern = { method: 'POST', urlPattern: '/youtubei/v1/browse' };
const SearchRequest: RequestPattern = { method: 'POST', urlPattern: '/youtubei/v1/search' };
const PlayerRequest: RequestPattern = { method: 'POST', urlPattern: '/youtubei/v1/player' };

const addAdBlockInterceptors = () => {
  if (!window.httpInterceptor) {
    return [];
  }

  return [
    window.httpInterceptor.addInterceptor(BrowseGetRequest.method, BrowseGetRequest.urlPattern, removeAdShelf),
    window.httpInterceptor.addInterceptor(BrowsePostRequest.method, BrowseGetRequest.urlPattern, removeAdShelf),
    window.httpInterceptor.addInterceptor(SearchRequest.method, SearchRequest.urlPattern, removeAdShelf),

    window.httpInterceptor.addInterceptor(BrowseGetRequest.method, BrowseGetRequest.urlPattern, removeAdTiles),
    window.httpInterceptor.addInterceptor(BrowsePostRequest.method, BrowseGetRequest.urlPattern, removeAdTiles),
    window.httpInterceptor.addInterceptor(SearchRequest.method, SearchRequest.urlPattern, removeAdTiles),

    window.httpInterceptor.addInterceptor(PlayerRequest.method, PlayerRequest.urlPattern, removeAdPlacements),
  ];
};

const addShortsBlockInterceptors = () => {
  if (!window.httpInterceptor) {
    return [];
  }

  return [
    window.httpInterceptor.addInterceptor(BrowseGetRequest.method, BrowseGetRequest.urlPattern, removeShortsShelf),
    window.httpInterceptor.addInterceptor(BrowsePostRequest.method, BrowseGetRequest.urlPattern, removeShortsShelf),
    window.httpInterceptor.addInterceptor(SearchRequest.method, SearchRequest.urlPattern, removeShortsShelf),
  ];
};

const useContentBlocker = () => {
  const { config } = useConfiguration();

  useEffect(() => {
    if (!config.adBlockEnabled) {
      return;
    }

    const removeInterceptorFns = addAdBlockInterceptors();
    return () => {
      for (const removeInterceptor of removeInterceptorFns) {
        removeInterceptor();
      }
    };
  }, [config.adBlockEnabled]);

  useEffect(() => {
    if (!config.shortsBlockEnabled) {
      return;
    }

    const removeInterceptorFns = addShortsBlockInterceptors();
    return () => {
      for (const removeInterceptor of removeInterceptorFns) {
        removeInterceptor();
      }
    };
  }, [config.shortsBlockEnabled]);
};

export default useContentBlocker;
