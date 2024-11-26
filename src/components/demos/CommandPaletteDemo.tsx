import { motion, AnimatePresence } from "framer-motion";
import { MacWindow } from "../MacWindow";
import type { DemoComponent } from "@/types/demo";
import { useConfig } from "@/context/ConfigContext";
import { useState, useEffect } from "react";
import { defaultConfig } from "@/config/defaults";

// Define command type
interface Command {
  id: string;
  title: string;
  icon: string;
  shortcut?: string;
}

const CommandPaletteDemo: DemoComponent = () => {
  const { config } = useConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  // Safely access commands with fallback
  const commands =
    config?.commandPalette?.commands || defaultConfig.commandPalette.commands;

  // Filter commands based on search with proper typing
  const filteredCommands = commands.filter((cmd: Command) =>
    cmd.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands.length]);

  const {
    animations: {
      searchInputDelay,
      itemStaggerDelay,
      hoverTransitionDuration,
      slideInDistance,
    },
    style: { maxHeight, width, backgroundColor, textColor },
  } = config?.commandPalette || defaultConfig.commandPalette;

  return (
    <MacWindow className="max-w-2xl">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: -slideInDistance }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxHeight, width }}
          className="relative"
        >
          {/* Search Input */}
          <div className="relative">
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: searchInputDelay }}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                config?.commandPalette?.placeholder || "Type a command..."
              }
              className="w-full bg-black/50 text-white px-4 py-3 rounded-lg
                placeholder-white/50 focus:outline-none focus:ring-2
                focus:ring-white/20 font-mono ring-1 ring-white/10"
              style={{ backgroundColor, color: textColor }}
            />
            <kbd
              className="absolute right-4 top-1/2 -translate-y-1/2
              text-white/40 font-mono text-sm"
            >
              ⌘K
            </kbd>
          </div>

          {/* Results List */}
          <AnimatePresence>
            {isOpen && (
              <motion.div style={{ backgroundColor }}>
                {filteredCommands.map((command: Command, index: number) => (
                  <motion.div
                    key={command.id}
                    initial={{ opacity: 0, x: -slideInDistance }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor:
                        selectedIndex === index
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    whileTap={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{
                      delay: index * itemStaggerDelay,
                      duration: hoverTransitionDuration,
                    }}
                    className="px-4 py-3 flex items-center space-x-3
                      text-white/80 cursor-pointer"
                    style={{ color: textColor }}
                  >
                    <span className="text-lg">{command.icon}</span>
                    <span className="flex-1">{command.title}</span>
                    {command.shortcut && (
                      <kbd className="text-white/40 font-mono text-sm">
                        {command.shortcut}
                      </kbd>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MacWindow>
  );
};

CommandPaletteDemo.title = "Command Palette";

export default CommandPaletteDemo;
