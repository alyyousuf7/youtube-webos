import { SegmentCategory } from './service';

export const SegmentCategoryLabels: Record<SegmentCategory, string> = {
  [SegmentCategory.SPONSOR]: 'Sponsor',
  [SegmentCategory.INTRO]: 'Intro',
  [SegmentCategory.OUTRO]: 'Outro',
  [SegmentCategory.INTERACTION]: 'Interaction',
  [SegmentCategory.SELFPROMO]: 'Self Promo',
  [SegmentCategory.MUSIC_OFFTOPIC]: 'Music (Offtopic)',
  [SegmentCategory.PREVIEW]: 'Preview',
  [SegmentCategory.FILLER]: 'Filler',
};

export const SegmentCategoryColors: Record<SegmentCategory, string> = {
  [SegmentCategory.SPONSOR]: '#00d400',
  [SegmentCategory.INTRO]: '#00ffff',
  [SegmentCategory.OUTRO]: '#0202ed',
  [SegmentCategory.INTERACTION]: '#cc00ff',
  [SegmentCategory.SELFPROMO]: '#ffff00',
  [SegmentCategory.MUSIC_OFFTOPIC]: '#ff9900',
  [SegmentCategory.PREVIEW]: '#ff00ff',
  [SegmentCategory.FILLER]: '#ff0000',
};
