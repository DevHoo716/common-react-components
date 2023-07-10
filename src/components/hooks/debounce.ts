import { useEffect, useState } from "react";

export const useDebounce = (cb: () => void, interval: number) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false);
        cb();
      }, interval);
      return () => clearTimeout(timer);
    }
  }, [isActive, interval, cb]);

  const trigger = () => setIsActive(true);

  return trigger;
};

export const debounce = (cb: (...args: any) => void, interval: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args);
    }, interval);
  };
};
