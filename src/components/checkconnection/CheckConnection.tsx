import { useEffect, useState } from "react";
import Condition from "../commons/Condition";
import type { ReactNode } from "react";

export const CheckConnection = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator?.onLine || true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <Condition show={!isOnline}>
        <div>Please check your internet connection.</div>
      </Condition>
      <Condition show={isOnline}>{children}</Condition>
    </>
  );
};
