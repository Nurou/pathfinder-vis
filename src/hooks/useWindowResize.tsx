import { useState, useEffect } from 'react';
// Define general type for useWindowSize hook, which includes width and height
interface Size {
  width: number | undefined;
  height: number | undefined;
}
// Usage
function App() {
  const size: Size = useWindowSize();
  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}
// Hook
export function useWindowSize(callback?: (entry: Size) => void): Size {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      setWindowSize(newSize);

      if (callback) {
        callback(newSize);
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
