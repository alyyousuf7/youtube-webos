export enum RemoteKey {
  RED = 'RED',
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  BLUE = 'BLUE',
  BACK = 'BACK',
}

export const RemoteKeyMap: Record<RemoteKey, number[]> = {
  [RemoteKey.RED]: [403, 166, 82],
  [RemoteKey.GREEN]: [404, 172, 71],
  [RemoteKey.YELLOW]: [405, 170],
  [RemoteKey.BLUE]: [406, 167],
  [RemoteKey.BACK]: [27],
};
