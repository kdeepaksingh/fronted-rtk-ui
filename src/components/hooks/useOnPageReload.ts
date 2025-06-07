import { useEffect } from "react";

const useOnPageReload = (action = () => {}) => {
  useEffect(() => {
    window.onbeforeunload = action;

    return () => {
      window.onbeforeunload = null;
    };

    // eslint-disable-next-line
  }, []);

  return action;
};

export default useOnPageReload;
