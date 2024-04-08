import 'spatial-navigation-polyfill';

enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
  ENTER = 'enter',
}

declare global {
  interface Window {
    __spatialNavigation__?: {
      keyMode?: 'NONE' | 'SHIFTARROW' | 'ARROW';
    };
    navigate: (direction: Direction) => void;
  }
}

const KeyDirectionMap: Record<number, Direction> = {
  38: Direction.UP,
  40: Direction.DOWN,
  37: Direction.LEFT,
  39: Direction.RIGHT,
  13: Direction.ENTER,
};

const handleKeyEvent = (event: KeyboardEvent & { Nc?: MouseEvent }) => {
  // something in YouTube is also forwarding MouseEvent instances to this handler
  // we only want to handle KeyboardEvent instances
  if (event.Nc instanceof MouseEvent) {
    return;
  }

  const keyCode = event.keyCode;
  const direction = KeyDirectionMap[keyCode];
  if (!direction) {
    return;
  }

  const youtubeContainer = document.getElementById('container');
  if (!youtubeContainer) {
    return;
  }

  const activeElement = document.activeElement as HTMLElement;
  if (!activeElement) {
    return;
  }

  // If the active element is within the YouTube container, we don't want to handle the event
  if (youtubeContainer.contains(activeElement)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  // this handler is called multiple times for a single key press
  // we only want to handle the key up event - the last event
  if (event.type !== 'keyup') {
    return;
  }

  if (direction === Direction.ENTER) {
    activeElement.click();
  }
  else {
    window.navigate(direction);
  }
};

export const setup = () => {
  if (!window.__spatialNavigation__) {
    console.error('Spatial navigation not loaded');
    return;
  }

  window.__spatialNavigation__.keyMode = 'NONE';

  window.addEventListener('keydown', handleKeyEvent, true);
  window.addEventListener('keypress', handleKeyEvent, true);
  window.addEventListener('keyup', handleKeyEvent, true);
};
