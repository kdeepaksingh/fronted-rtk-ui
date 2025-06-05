import { useEffect, useRef, useState } from "react";

export const useTimer = ({ tick = 3, onDone = () => {}, start = false }) => {
  const [seconds, setSeconds] = useState(tick);
  const counter = useRef(tick);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const reset = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setSeconds(tick);
      counter.current = tick;
    };

    if (tick > 0 && start && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        counter.current -= 1;
        setSeconds(counter.current);

        if (counter.current <= 0) {
          reset();
          onDone?.();
        }
      }, 1000);
    }

    return reset;
  }, [tick, start, onDone]);

  return seconds;
};

export default useTimer;
