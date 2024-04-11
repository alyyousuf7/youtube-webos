import { Reducer } from 'react';

type State<Key, Handler> = Array<{ key: Key; priority: number; handler: Handler }>;

type Action<Key, Handler> = {
  type: 'ADD_KEY_HANDLER';
  key: Key;
  priority: number;
  handler: Handler;
} | {
  type: 'REMOVE_KEY_HANDLER';
  key: Key;
  priority: number;
};

export type RemoteReducer<Key, Handler> = Reducer<State<Key, Handler>, Action<Key, Handler>>;

export const reducer = <Key, Handler>(state: State<Key, Handler>, action: Action<Key, Handler>) => {
  switch (action.type) {
    case 'ADD_KEY_HANDLER':
      return [...state, { key: action.key, priority: action.priority, handler: action.handler }];
    case 'REMOVE_KEY_HANDLER':
      return state.filter(handler => !(handler.key === action.key && handler.priority === action.priority));
    default:
      return state;
  }
};
