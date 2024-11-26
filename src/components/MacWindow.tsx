import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useConfig } from "../context/ConfigContext";
import { defaultConfig, macWindowVariants } from "../config/defaults";

interface MacWindowProps {
  children: ReactNode;
  className?: string;
}

export default function MacWindow({
  children,
  className = "",
}: MacWindowProps) {
  const { config } = useConfig();

  // Safely access macWindow config with fallback to defaults
  const macWindowConfig = config?.macWindow || defaultConfig.macWindow;

  // Get variant styles
  const variantStyles = macWindowVariants[macWindowConfig.variant];

  const {
    style: { borderRadius, shadow },
    animations,
    title,
    showTitle,
  } = macWindowConfig;

  // Add extra styles for glassmorphic variant
  const extraStyles =
    macWindowConfig.variant === "glassmorphic"
      ? {
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", // For Safari
          boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }
      : {};

  return (
    <motion.div
      className={`rounded-xl border ${className}`}
      style={{
        backgroundColor: variantStyles.backgroundColor,
        borderColor: variantStyles.borderColor,
        borderRadius,
        boxShadow:
          variantStyles.shadow === "none"
            ? "none"
            : shadow === "lg"
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
              : undefined,
        ...extraStyles,
      }}
      whileHover={animations.hover ? { y: -2 } : undefined}
      initial={animations.mount ? { opacity: 0, y: 20 } : undefined}
      animate={animations.mount ? { opacity: 1, y: 0 } : undefined}
    >
      <div
        className="h-12 rounded-t-xl border-b flex items-center px-4"
        style={{
          backgroundColor: variantStyles.titleBarColor,
          borderColor: variantStyles.borderColor,
        }}
      >
        {variantStyles.buttonStyle !== "hidden" && (
          <div className="flex gap-2 absolute">
            <motion.div
              className={`w-3 h-3 rounded-full ${variantStyles.buttonStyle === "minimal" ? "bg-white/20" : "bg-[#ff5f57]"}`}
              whileHover={animations.buttonHover ? { scale: 1.1 } : undefined}
            />
            <motion.div
              className={`w-3 h-3 rounded-full ${variantStyles.buttonStyle === "minimal" ? "bg-white/20" : "bg-[#febc2e]"}`}
              whileHover={animations.buttonHover ? { scale: 1.1 } : undefined}
            />
            <motion.div
              className={`w-3 h-3 rounded-full ${variantStyles.buttonStyle === "minimal" ? "bg-white/20" : "bg-[#28c841]"}`}
              whileHover={animations.buttonHover ? { scale: 1.1 } : undefined}
            />
          </div>
        )}
        {showTitle && title && (
          <div className="w-full text-center text-white/60 text-sm font-medium">
            {title}
          </div>
        )}
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
