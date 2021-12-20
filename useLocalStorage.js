import * as React from 'react';

function useLocalStorage(
  key,
  initialValue = "",
  options = { serialize: JSON.stringify, deserialize: JSON.parse }
) {
  const { serialize, deserialize } = options;
  const [value, setValue] = React.useState(() => {
    const existingValue = window.localStorage.getItem(key);

    if (existingValue) {
      return deserialize(existingValue);
    }

    return initialValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(value));
  }, [key, value, serialize]);

  return [value, setValue];
}

// And Enjoy
const [username, setUsername] = useLocalStorage("username", "@imarenny");
