import {
  motion,
  useMotionValue,
  animate,
  useTransform,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import StringUtils from "../../utils/StringUtils";

// Define the props type
interface AnimateNumberProps {
  number?: number;
  duration?: number;
  decimal?: number;
}

export const AnimateNumber: React.FC<AnimateNumberProps> = ({
  number = 0,
  duration = 1,
  decimal = 2,
}) => {
  const eleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(eleRef);
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  const count = useMotionValue(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animatedValue = useTransform(count, (latest: any) =>
    latest.toFixed(decimal)
  );

  useMotionValueEvent(count, "animationComplete", () =>
    setAnimationComplete(true)
  );

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, number, { duration });
      return animation.stop;
    }
  }, [duration, number, isInView, count]);

  return (
    <motion.div ref={eleRef}>
      {isAnimationComplete
        ? StringUtils.numberToFixedDecimal(number, decimal)
        : animatedValue}
    </motion.div>
  );
};
