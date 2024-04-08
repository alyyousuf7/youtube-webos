import { useEffect, useState } from 'react';

// useElementObserver is a hook that observes the document for the presence of an element.
//
// This will only work if the element is added/removed from the DOM.
// This will not look for change in existing element's attributes to match the selector.
const useElementObserver = <T extends Element>(selector: string, target: Element | null = document.body): T | null => {
  const [element, setElement] = useState<T | null>(null);

  useEffect(() => {
    if (target === null) {
      return;
    }

    const targetElement = target.querySelector(selector);
    if (targetElement) {
      setElement(targetElement as T);
    }

    const observer = new MutationObserver((mutations) => {
      const targetElementAdded = mutations.flatMap(({ addedNodes }) => Array.from(addedNodes))
        .find(node => node instanceof Element && node.matches(selector));
      if (targetElementAdded) {
        setElement(targetElementAdded as T);
        return;
      }

      const targetElementRemoved = mutations.flatMap(({ removedNodes }) => Array.from(removedNodes))
        .find(node => node instanceof Element && node.matches(selector));
      if (targetElementRemoved) {
        setElement(null);
        return;
      }
    });

    observer.observe(target, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [target, selector]);

  return element;
};

export default useElementObserver;
