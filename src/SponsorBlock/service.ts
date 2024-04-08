import { sha256 } from 'js-sha256';

const BASE_URL = 'https://sponsorblock.inf.re/api';

export enum SegmentCategory {
  SPONSOR = 'sponsor',
  INTRO = 'intro',
  OUTRO = 'outro',
  INTERACTION = 'interaction',
  SELFPROMO = 'selfpromo',
  MUSIC_OFFTOPIC = 'music_offtopic',
  PREVIEW = 'preview',
  FILLER = 'filler',
}

export enum ActionType {
  SKIP = 'skip',
  MUTE = 'mute',
  FULL = 'full',
  POI = 'poi',
  CHAPTER = 'chapter',
}

export type Segment = {
  segment: [start: number, end: number];
  UUID: string;
  category: SegmentCategory;
  actionType: ActionType;
  locked: number;
  votes: number;
  videoDuration: number;
  description: string;
};

type VideoSegments = {
  videoID: string;
  segments: Segment[];
};

export const getSegmentsPrivately = async (videoId: string, categories: SegmentCategory[]) => {
  const idHashed = sha256(videoId).substring(0, 4);

  const url = new URL(`${BASE_URL}/skipSegments/${idHashed}`);
  url.searchParams.append('categories', JSON.stringify(categories));

  const response = await fetch(url.toString());
  if (response.status !== 200) {
    const results = await response.json() as string[];
    throw new Error(results[0] ?? `Failed to fetch segments for video ID "${videoId}" using hash "${idHashed}"`);
  }

  const results = await response.json() as VideoSegments[];
  const result = results.find(item => item.videoID === videoId);

  if (!result) {
    throw new Error(`Segments for video ID "${videoId}" using hash "${idHashed}" not found`);
  }

  // filter out segments that are shorter than 1 second
  return result.segments.filter(segment => segment.segment[1] - segment.segment[0] >= 1);
};

export const getSegments = async (videoId: string, categories: SegmentCategory[]) => {
  const url = new URL(`${BASE_URL}/skipSegments`);
  url.searchParams.append('videoID', videoId);
  url.searchParams.append('categories', JSON.stringify(categories));

  const response = await fetch(url.toString());
  if (response.status === 404) {
    throw new Error(`Segments for video ID "${videoId}" not found`);
  }
  if (response.status !== 200) {
    throw new Error(`Failed to fetch segments for video ID "${videoId}"`);
  }

  const result = await response.json() as Segment[];

  // filter out segments that are shorter than 1 second
  return result.filter(segment => segment.segment[1] - segment.segment[0] >= 1);
};
