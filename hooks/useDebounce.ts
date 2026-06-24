import { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 500) => {
  const [debouncevalue, setdebouncevalue] = useState(value);
  const [isDebounce, setisDebounce] = useState(false);
  useEffect(() => {
    setisDebounce(true);
    const time = setTimeout(() => {
      setdebouncevalue(value);
      setisDebounce(false);
    }, delay);
    return () => clearTimeout(time);
  }, [value, delay]);

  return { debouncevalue, isDebounce };
};

export default useDebounce;
