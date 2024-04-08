import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import useVideoProgressBar from './useVideoProgressBar';

// ProgressBarPortal is a component that renders its children to a progress bar element.
//
// This creates a new Portal div element every time a re-render cycle occurs and appends it to the mount point.
// On any mutation to the mount point, the portal is removed from the DOM and we have to re-append it.
const ProgressBarPortal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const progressBar = useVideoProgressBar();
  const mount = progressBar.element;
  const el = document.createElement('div');

  // We need to set the position to absolute to ensure that the portal is rendered on top of the progress bar
  el.style.position = 'absolute';
  el.style.top = '0';

  useEffect(() => {
    if (!mount) {
      return;
    }
    mount.appendChild(el);

    // YouTube completely re-renders the progress bar when any visual change happens to the progress bar, which includes
    // the live head progressing. This causes the portal element to be removed from the DOM. We need to re-append the
    // portal
    const observer = new MutationObserver(() => {
      if (!mount.contains(el)) {
        mount.appendChild(el);
      }
    });
    observer.observe(mount, { childList: true, subtree: true });
  }, [el, mount]);

  return ReactDOM.createPortal(children, el);
};

export default ProgressBarPortal;
