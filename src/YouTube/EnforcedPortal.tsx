import * as Portal from '@radix-ui/react-portal';
import React, { useEffect, useRef } from 'react';

// EnforcedPortal is portal which is re-appended to the mount point on any mutation to the mount point.
const EnforcedPortal: React.FC<React.PropsWithChildren & { mount: Element | null }> = ({ children, mount }) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    if (!mount) {
      return;
    }

    const currentEl = el.current;
    currentEl.dataset.portal = 'true';
    currentEl.classList.add('tw-preflight');

    mount.appendChild(currentEl);

    // observe the mount point for any changes and re-append the portal if the portal is removed
    const observer = new MutationObserver(() => {
      if (!mount.contains(currentEl)) {
        mount.appendChild(currentEl);
      }
    });
    observer.observe(mount, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (mount.contains(currentEl)) {
        mount.removeChild(currentEl);
      }
    };
  }, [mount]);

  return <Portal.Root asChild container={el.current}>{children}</Portal.Root>;
};

export default EnforcedPortal;
