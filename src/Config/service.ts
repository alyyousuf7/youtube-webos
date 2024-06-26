import { SegmentCategory } from '@/SponsorBlock/service';

export type Config = {
  removeAds: boolean;
  removeShorts: boolean;
  enableSponsorBlock: boolean;
  sponsorBlockSkipCategories: SegmentCategory[];
  sponsorBlockAutoSkip: boolean;
};

const LocalStorageConfigKey = 'youtube-tv-config';

const DefaultConfig: Config = {
  removeAds: true,
  removeShorts: true,
  enableSponsorBlock: true,
  sponsorBlockSkipCategories: [
    SegmentCategory.SPONSOR,
    SegmentCategory.INTRO,
    SegmentCategory.OUTRO,
    SegmentCategory.INTERACTION,
    SegmentCategory.SELFPROMO,
    SegmentCategory.MUSIC_OFFTOPIC,
    SegmentCategory.PREVIEW,
    SegmentCategory.FILLER,
  ],
  sponsorBlockAutoSkip: true,
};

export const load = () => {
  const rawConfig = localStorage.getItem(LocalStorageConfigKey);
  if (!rawConfig) {
    return DefaultConfig;
  }

  const parsedConfig = JSON.parse(rawConfig);

  return {
    ...DefaultConfig,
    ...parsedConfig,
  };
};

export const save = (config: Config) => {
  localStorage.setItem(LocalStorageConfigKey, JSON.stringify(config));
};
