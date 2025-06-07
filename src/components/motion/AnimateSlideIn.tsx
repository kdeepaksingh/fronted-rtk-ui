import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateSlideInProps {
  children: ReactNode;
}

export const AnimateSlideIn: React.FC<AnimateSlideInProps> = ({ children }) => {
  return (
    <motion.div
      initial="hide"
      whileInView="in"
      variants={{
        in: { x: 0, opacity: 1, visibility: "visible" },
        hide: { x: 200, opacity: 0, visibility: "hidden" },
      }}
      transition={{
        duration: 0.2,
        ease: "easeIn",
      }}
    >
      {children}
    </motion.div>
  );
};
