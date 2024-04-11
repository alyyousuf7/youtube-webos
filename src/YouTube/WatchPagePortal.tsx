import React from 'react';

import useElementObserver from '@/useElementObserver';

import EnforcedPortal from './EnforcedPortal';

const WatchPagePortal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const mount = useElementObserver<HTMLElement>('ytlr-watch-default');

  return <EnforcedPortal mount={mount}>{children}</EnforcedPortal>;
};

export default WatchPagePortal;
