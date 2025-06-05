import React from "react";
import type { ReactNode } from "react";

interface ConditionProps {
  show?: boolean;
  mounted?: boolean;
  children: ReactNode;
}

export const Condition: React.FC<ConditionProps> = ({
  show = true,
  mounted = false,
  children,
}) => {
  if (!show && !mounted) {
    return null;
  }

  if (mounted) {
    return <div className={`${!show && "hidden"}`}>{children}</div>;
  }

  return <>{children}</>;
};

export default Condition;
