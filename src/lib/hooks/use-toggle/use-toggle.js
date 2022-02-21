import * as React from "react";

export function useToggle(initialValue, pair) {
  if (!initialValue || !pair.includes(initialValue)) {
    throw new Error(`Invalid value: ${initialValue}`);
  }

  const [value, setValue] = React.useState(initialValue);

  const toggle = () => {
    setValue(value === pair[0] ? pair[1] : pair[0]);
  };

  return [value, toggle];
}
