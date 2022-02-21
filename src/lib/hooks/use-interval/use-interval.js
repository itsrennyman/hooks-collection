import * as React from "react";

export function useInterval(cb, ms) {
  const [isActive, setIsActive] = React.useState(false);
  const intervalRef = React.useRef(null);

  const start = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(cb, ms);
    }
  };

  const stop = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const toggle = () => {
    if (isActive) {
      stop();
    } else {
      start();
    }
  };

  return { start, stop, toggle, isActive };
}
