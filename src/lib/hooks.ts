import { useEffect, useState } from 'react';

/**
 * As attributes, it's better to pass useCallback functions
 * @param onMount
 * @param onUnmount
 */
export function useOnMount(onMount?: () => void, onUnmount?: () => void) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    onMount?.();
    return () => {
      setMounted(false);
      onUnmount?.();
    };
  }, [onMount, onUnmount]);

  return mounted;
}
