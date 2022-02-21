import * as React from "react";

const events = ["keypress", "mousemove", "touchmove", "click", "scroll"];

export function useIdle(ms = 2000, initialState = true) {
  const [idle, setIdle] = React.useState(initialState);
  const timerRef = React.useRef();

  React.useEffect(() => {
    const handleEvents = () => {
      setIdle(false);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIdle(true);
      }, ms);
    };

    events.forEach((event) => document.addEventListener(event, handleEvents));

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleEvents)
      );
    };
  }, [ms]);

  return idle;
}
