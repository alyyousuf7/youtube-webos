import { useEffect } from 'react';

import { RemoteKey } from './constants';

const RemoteKeyMap: Record<RemoteKey, number[]> = {
  [RemoteKey.RED]: [403, 166, 82],
  [RemoteKey.GREEN]: [404, 172, 71],
  [RemoteKey.YELLOW]: [405, 170],
  [RemoteKey.BLUE]: [406, 167],
  [RemoteKey.BACK]: [27],
};

type onPressFn = (key: RemoteKey) => boolean;

// useRemoteKey looks for the specified key(s) in the RemoteKeyMap and calls the onPress function when the key is pressed.
// If the onPress function returns true, the event's default behavior is prevented and is stopped from propagating.
const useRemoteKey = (keys: RemoteKey | RemoteKey[], onPress: onPressFn) => {
  useEffect(() => {
    const targetKeys = Array.isArray(keys) ? keys : [keys];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }

      const keyEntry = Object.entries(RemoteKeyMap)
        .find(([, codes]) => codes.includes(event.keyCode)) as [RemoteKey, number[]] | undefined;

      if (!keyEntry || !targetKeys.includes(keyEntry[0])) {
        return;
      }

      if (onPress(keyEntry[0])) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [keys, onPress]);
};

export default useRemoteKey;
