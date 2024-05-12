import {useEffect, useCallback } from 'react';

function useCtrlShiftHandler(callback) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Shift') {
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

export default useCtrlShiftHandler;
