import { useEffect, useRef } from 'react';
import { restartTypedAnimation, destroyTypedAnimation } from '../utils/typedUtils';

interface TypedOptions {
  typeSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  contentType?: string;
  loopCount?: boolean | number;
}

export const useTypedAnimation = (strings: string[], options: Partial<TypedOptions> = {}) => {
  const typedInstanceRef = useRef<any>(null);

  const initTyped = () => {
    const instance = restartTypedAnimation(strings, options);
    typedInstanceRef.current = instance;
  };

  const destroyTyped = () => {
    destroyTypedAnimation();
    typedInstanceRef.current = null;
  };

  useEffect(() => {
    // Wait for jQuery and typed.js to be available
    const checkDependencies = () => {
      if (typeof window !== 'undefined' && window.$ && window.$.fn.typed) {
        initTyped();
      } else {
        // Retry after a short delay
        setTimeout(checkDependencies, 100);
      }
    };

    checkDependencies();

    // Cleanup on unmount
    return () => {
      destroyTyped();
    };
  }, [strings]); // Re-initialize when strings change

  return {
    destroyTyped,
    initTyped
  };
}; 