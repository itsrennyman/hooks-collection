import * as React from 'react;

function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = React.useState(() => {
    const existingValue = window.localStorage.getItem(key);

    if (existingValue) {
      return JSON.parse(existingValue);
    }

    return initialValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
