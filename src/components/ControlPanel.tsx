import { motion } from "framer-motion";

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
