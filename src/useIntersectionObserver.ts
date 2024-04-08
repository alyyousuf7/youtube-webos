import { useEffect, useState } from 'react';

const useIntersectionObserver = (target: Element | null, root: Element | null = null): boolean => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (target === null) {
      setVisible(false);
      return;
    }

    const onIntersection: IntersectionObserverCallback = (entries) => {
      setVisible(entries.some(entry => entry.isIntersecting));
    };

    const observer = new IntersectionObserver(onIntersection, { root });

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [target, root]);

  return visible;
};

export default useIntersectionObserver;
