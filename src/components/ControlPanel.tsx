import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ControlPanelProps {
  activeComponents: Record<string, boolean>;
  setActiveComponents: (components: Record<string, boolean>) => void;
  componentTitles: string[];
}

export default function ControlPanel({
  activeComponents,
  setActiveComponents,
  componentTitles,
}: ControlPanelProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 left-4 right-4 md:left-8 bg-white/10 backdrop-blur-sm 
          rounded-lg border border-white/20 shadow-lg z-50"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left flex items-center justify-between"
        >
          <h3 className="text-white font-semibold">Active Components</h3>
          <svg
            className={`w-5 h-5 text-white transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isExpanded && (
          <div className="p-4 pt-0 space-y-2 max-h-60 overflow-y-auto">
            {componentTitles.map((title) => (
              <label key={title} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeComponents[title]}
                  onChange={() => {
                    setActiveComponents({
                      ...activeComponents,
                      [title]: !activeComponents[title],
                    });
                  }}
                  className="rounded bg-white/20 border-white/30 text-blue-500 
                    focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-white/80">{title}</span>
              </label>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm 
        rounded-lg p-4 border border-white/20 shadow-lg z-50"
    >
      <h3 className="text-white font-semibold mb-4">Active Components</h3>
      <div className="space-y-2">
        {componentTitles.map((title) => (
          <label key={title} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={activeComponents[title]}
              onChange={() => {
                setActiveComponents({
                  ...activeComponents,
                  [title]: !activeComponents[title],
                });
              }}
              className="rounded bg-white/20 border-white/30 text-blue-500 
                focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-white/80">{title}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
}
