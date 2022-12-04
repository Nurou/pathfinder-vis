import { useCallback, useLayoutEffect, useState } from 'react';

export const useResizeObserver = (callback?: (entry: DOMRectReadOnly) => void) => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      if (callback) {
        callback(entry.contentRect);
      }
    },
    [callback]
  );

  useLayoutEffect(() => {
    let RO: ResizeObserver | null = new ResizeObserver((entries: ResizeObserverEntry[]) =>
      handleResize(entries)
    );
    RO.observe(document.body);

    return () => {
      RO?.disconnect();
      RO = null;
    };
  }, []);

  return [width, height];
};
