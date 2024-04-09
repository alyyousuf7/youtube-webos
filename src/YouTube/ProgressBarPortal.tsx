import React from 'react';

import EnforcedPortal from './EnforcedPortal';
import useVideoProgressBar from './useVideoProgressBar';

const ProgressBarPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const progressBar = useVideoProgressBar();

  return <EnforcedPortal mount={progressBar.element}>{children}</EnforcedPortal>;
};

export default ProgressBarPortal;
