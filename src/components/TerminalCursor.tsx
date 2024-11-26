import { motion } from "framer-motion";

export default function TerminalCursor() {
  return (
    <motion.span
      className="inline-block w-3 h-6 bg-white ml-1"
      animate={{
        opacity: [1, 0],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "steps(2)",
      }}
    ></motion.span>
  );
}
