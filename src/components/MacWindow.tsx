import { motion, AnimatePresence } from "framer-motion";
import { useConfig } from "@/context/ConfigContext";
import { defaultConfig, macWindowVariants } from "@/config/defaults";
import { useState, useRef } from "react";
import { useComponents } from "@/context/ComponentsContext";

interface MacWindowProps {
  children: React.ReactNode;
  className?: string;
  componentTitle?: string;
}

interface ComponentsState {
  [key: string]: boolean;
}

export function MacWindow({
  children,
  className = "",
  componentTitle,
}: MacWindowProps) {
  const { config } = useConfig();
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const componentsContext = useComponents();
  const setActiveComponents = (componentsContext as any).setActiveComponents;
  const windowRef = useRef<HTMLDivElement>(null);

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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (componentTitle && setActiveComponents) {
        setActiveComponents((prev: ComponentsState) => ({
          ...prev,
          [componentTitle]: false,
        }));
      }
    }, 600); // Match animation duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={windowRef}
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
          whileHover={animations.hover ? { 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          } : undefined}
          initial={animations.mount ? { 
            opacity: 0,
            y: 20,
          } : undefined}
          animate={animations.mount ? { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut"
            }
          } : undefined}
          exit={isClosing ? {
            scale: [1, 1.02, 0.98, 0.95, 0.8, 0.4],
            opacity: [1, 0.9, 0.8, 0.6, 0.4, 0],
            x: [0, -2, 4, -4, 2, 0], 
            y: [0, 2, -2, 2, -2, 0],
            rotateX: [0, 2, -2, 2, -2, 0],
            scaleY: [1, 1, 0.8, 0.6, 0.3, 0.1],
            scaleX: [1, 1, 1, 1, 1, 0.1], // Added horizontal compression at the end
            transformOrigin: ["50% 50%", "50% 50%", "50% 50%", "50% 50%", "50% 50%", "50% 50%"],
            filter: [
              "brightness(1) contrast(1) blur(0px) hue-rotate(0deg)",
              "brightness(1.2) contrast(1.4) blur(1px) hue-rotate(5deg)", 
              "brightness(1.4) contrast(1.6) blur(2px) hue-rotate(-5deg)",
              "brightness(0.8) contrast(2) blur(3px) hue-rotate(10deg)",
              "brightness(0.4) contrast(3) blur(4px) hue-rotate(-10deg)",
              "brightness(0) contrast(4) blur(6px) hue-rotate(0deg)"
            ],
            backgroundImage: [
              "none",
              "linear-gradient(transparent 96%, rgba(255,255,255,0.2) 97%, transparent 100%)",
              "linear-gradient(transparent 94%, rgba(255,255,255,0.3) 95%, transparent 100%)",
              "linear-gradient(transparent 92%, rgba(255,255,255,0.4) 93%, transparent 100%)",
              "none"
            ],
            backgroundSize: ["100% 100%", "100% 2px", "100% 3px", "100% 2px", "100% 100%"],
            transition: {
              duration: 0.6,
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.75],
              ease: [0.4, 0, 0.2, 1],
            },
          } : undefined}
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
                  onClick={handleClose}
                  className={`w-3 h-3 rounded-full cursor-pointer ${variantStyles.buttonStyle === "minimal" ? "bg-white/20" : "bg-[#ff5f57] hover:bg-[#ff5f57]/80"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.5,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                />
                <motion.div
                  className={`w-3 h-3 rounded-full ${variantStyles.buttonStyle === "minimal" ? "bg-white/20" : "bg-[#febc2e]"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                />
                <motion.div
                  className={`w-3 h-3 rounded-full ${variantStyles.buttonStyle === "minimal" ? "bg-white/20" : "bg-[#28c841]"}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                />
              </div>
            )}
            {showTitle && title && (
              <motion.div 
                className="w-full text-center text-white/60 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                {title}
              </motion.div>
            )}
          </div>
          <div className="p-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
