import useElementObserver from '@/useElementObserver';
import useIntersectionObserver from '@/useIntersectionObserver';

export enum VideoProgressBarType {
  // CHAPTER_MARKER_BAR: https://www.youtube.com/tv?env_forceFullAnimation=1#/watch?v=ntz2c2z54dg
  //   <ytlr-progress-bar>
  //     <ytlr-multi-markers-player-bar-renderer>
  //       <div class="ytlr-multi-markers-player-bar-renderer__slider">
  CHAPTER_MARKER_BAR = '.ytlr-multi-markers-player-bar-renderer__slider',

  // TIME_MARKER_BAR: https://www.youtube.com/tv?env_forceFullAnimation=1#/watch?v=03nrv09T7bs
  //   <ytlr-progress-bar>
  //     <ytlr-multi-markers-player-bar-renderer>
  //       <div class="ytlr-multi-markers-player-bar-renderer__time-markers-slider">
  TIME_MARKER_BAR = '.ytlr-multi-markers-player-bar-renderer__time-markers-slider',

  // RECTANGULAR_BAR: https://www.youtube.com/tv?env_forceFullAnimation=1#/watch?v=ZKgHUzsYsGM
  //   <ytlr-progress-bar>
  //     <div class="ytlr-progress-bar__slider--rectangular-progress-bar">
  RECTANGULAR_BAR = '.ytlr-progress-bar__slider--rectangular-progress-bar',
}

// useVideoProgressBar returns the element and the type of progress bar that is currently visible on the screen,
// along with the container of the progress bar.
//
// YouTube renders a default progress bar all the time (even on browse page), but the correct progress bar is rendered
// first when the user takes an action to view the progress bar (by pausing or seeking the video).
const useVideoProgressBar = () => {
  const element = useElementObserver(Object.values(VideoProgressBarType).join(', '));
  const visible = useIntersectionObserver(element);

  // the rectanglular bar is always present in the DOM, and the correct progress bar is rendered first when
  // the progress bar attempts to render.
  // so we should only return the progress bar information when it is visible
  if (!visible || !element) {
    return { type: null, element: null };
  }

  const type = Object.values(VideoProgressBarType).find(value => element.matches(value)) as VideoProgressBarType;
  return { type, element };
};

export default useVideoProgressBar;
