import {useEffect, useCallback } from 'react';

function useCtrlEnterHandler(callback) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

export default useCtrlEnterHandler;
