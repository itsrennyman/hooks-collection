import * as React from "react";

export function randomId() {
  return `useId-${Math.random().toString(36).substr(2, 9)}`;
}

export function useId() {
  const id = React.useRef(randomId());
  return id.current;
}
