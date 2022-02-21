import * as React from "react";

export function useClickOutside(handler, extraEvents = []) {
  const ref = React.useRef();
  const events = React.useMemo(
    () => ["mousedown", "touchstart", ...extraEvents].filter(Boolean),
    [extraEvents]
  );

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    events.forEach((event) => {
      document.addEventListener(event, handleClick);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleClick);
      });
    };
  }, [handler, ref, events]);

  return ref;
}
