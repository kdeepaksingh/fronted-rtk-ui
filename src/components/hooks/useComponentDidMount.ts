import { useEffect, useState } from "react";

const IDLE = "IDLE";
const MOUNTED = "MOUNTED";

type UseComponentDidMountProps = {
  onMount?: () => void;
  onDestroy?: () => void;
};

export const useComponentDidMount = ({ onMount, onDestroy }: UseComponentDidMountProps) => {
  const [status, setStatus] = useState(IDLE);

  useEffect(() => {
    if (typeof onMount === "function") {
      onMount();
    }

    setStatus(MOUNTED);

    return () => {
      if (typeof onDestroy === "function") {
        onDestroy();
      }
    };
  }, []);

  return status;
};

export default useComponentDidMount;
