import React, { useCallback, useContext, useEffect, useReducer } from 'react';

import { RemoteKey, RemoteKeyMap } from './constants';
import { reducer, RemoteReducer } from './reducer';

type RemoteKeyHandleFn = (key: RemoteKey) => boolean;

type RemoteContext = {
  addKeyHandler: (key: RemoteKey, priority: number, handler: RemoteKeyHandleFn) => void;
  removeKeyHandler: (key: RemoteKey, priority: number) => void;
};

const Context = React.createContext<RemoteContext | null>(null);

const RemoteProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer as RemoteReducer<RemoteKey, RemoteKeyHandleFn>, []);

  const addKeyHandler = useCallback((key: RemoteKey, priority: number, handler: RemoteKeyHandleFn) => {
    dispatch({ type: 'ADD_KEY_HANDLER', key, priority, handler });
  }, []);

  const removeKeyHandler = useCallback((key: RemoteKey, priority: number) => {
    dispatch({ type: 'REMOVE_KEY_HANDLER', key, priority });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }

      const keyEntry = Object.entries(RemoteKeyMap)
        .find(([, codes]) => codes.includes(event.keyCode)) as [RemoteKey, number[]] | undefined;

      if (!keyEntry) {
        return;
      }

      const handlers = state.filter(handler => handler.key === keyEntry[0]).sort((a, b) => b.priority - a.priority);
      for (const handler of handlers) {
        if (handler.handler(keyEntry[0])) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [state]);

  const value: RemoteContext = {
    addKeyHandler,
    removeKeyHandler,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// useRemoteKey looks for the specified key(s) in the RemoteKeyMap and calls the onPress function when the key is pressed.
// If the onPress function returns true, the event's default behavior is prevented and is stopped from propagating.
export const useRemoteKey = (key: RemoteKey, priority: number, handler: RemoteKeyHandleFn) => {
  const context = useContext(Context) as RemoteContext;
  if (!context) {
    throw new Error('useRemoteKey must be used within a RemoteProvider');
  }

  const { addKeyHandler, removeKeyHandler } = context;

  useEffect(() => {
    addKeyHandler(key, priority, handler);
    return () => {
      removeKeyHandler(key, priority);
    };
  }, [key, priority, handler, addKeyHandler, removeKeyHandler]);
};

export default RemoteProvider;
