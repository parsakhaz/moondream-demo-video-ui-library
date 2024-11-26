import { motion } from "framer-motion";
import { MacWindow } from "../MacWindow";
import type { DemoComponent } from "@/types/demo";
import { useConfig } from "@/context/ConfigContext";
import { useState, useEffect } from "react";

const CodeBlockDemo: DemoComponent = () => {
  const { config } = useConfig();
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [codeLines, setCodeLines] = useState<string[]>([]);

  useEffect(() => {
    // Split the code into lines whenever config changes
    setCodeLines(config.codeEditor.code.split("\n"));
    // Restart typing animation
    setIsTyping(true);
  }, [config.codeEditor.code]);

  return (
    <MacWindow className="max-w-2xl" componentTitle="Animated Code Editor">
      <div className="text-white font-mono">
        {/* Code Editor Header */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 rounded bg-[#2a2a2a]">script.js</div>
            <motion.div
              animate={{ opacity: [1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
          </div>
        </div>

        {/* Code Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1e1e1e] rounded-lg p-4 overflow-x-auto"
        >
          <pre className="relative">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  backgroundColor:
                    hoveredLine === index
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                }}
                transition={{
                  delay: isTyping ? index * 0.1 : 0,
                  duration: 0.2,
                }}
                onMouseEnter={() => setHoveredLine(index)}
                onMouseLeave={() => setHoveredLine(null)}
                className="relative cursor-pointer group"
              >
                {/* Line Number */}
                <span className="select-none inline-block w-8 text-gray-500 text-right mr-4">
                  {index + 1}
                </span>

                {/* Code Content */}
                <motion.span
                  initial={isTyping ? { opacity: 0 } : { opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: isTyping ? index * 0.1 : 0 }}
                  className="relative"
                >
                  {line.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={isTyping ? { opacity: 0 } : { opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: isTyping ? index * 0.1 + charIndex * 0.02 : 0,
                      }}
                      className={
                        char.match(/[(){}[\]]/)
                          ? "text-yellow-300"
                          : char.match(/['"]/)
                            ? "text-green-300"
                            : line.match(/^function |const |let |var /) &&
                                charIndex < 8
                              ? "text-purple-300"
                              : char.match(/[.]/)
                                ? "text-white"
                                : "text-blue-300"
                      }
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>

                {/* Hover Indicator */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredLine === index ? 1 : 0,
                    width: "3px",
                  }}
                  className="absolute left-0 top-0 h-full bg-blue-400"
                />
              </motion.div>
            ))}
          </pre>
        </motion.div>
      </div>
    </MacWindow>
  );
};

CodeBlockDemo.title = "Animated Code Editor";

export default CodeBlockDemo;
