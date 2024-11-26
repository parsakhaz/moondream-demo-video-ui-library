import { motion } from "framer-motion";
import MacWindow from "../MacWindow";
import type { DemoComponent } from "@/types/demo";
import { useConfig } from "@/context/ConfigContext";
import { useState, useEffect, useCallback } from "react";
import { defaultConfig } from "@/config/defaults";
import { ConfigEditor } from "@/components/ConfigEditor";

interface MenuItem {
  id: string;
  text: string;
  href: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const TypewriterMenuWithShortcut: DemoComponent = () => {
  const { config } = useConfig();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isWaitingForEnter, setIsWaitingForEnter] = useState(false);
  const [showEnterHint, setShowEnterHint] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("detection");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories =
    config?.interactiveTypewriter?.categories ||
    defaultConfig.interactiveTypewriter.categories;
  const currentCategory = categories.find(
    (c: Category) => c.id === selectedCategory,
  )!;
  const menuItems = currentCategory.items;
  const { typingSpeed, cursorBlinkSpeed, enterHintDelay } =
    config?.interactiveTypewriter?.animations ||
    defaultConfig.interactiveTypewriter.animations;

  const handleEnter = useCallback(() => {
    if (isWaitingForEnter) {
      setIsEnterPressed(true);
      setTimeout(() => {
        setIsEnterPressed(false);
        setIsWaitingForEnter(false);
        setShowEnterHint(false);
        const nextIndex = (currentItemIndex + 1) % menuItems.length;
        setCurrentItemIndex(nextIndex);
        setDisplayText("");
        setIsTyping(true);
      }, 150); // Duration of press animation
    }
  }, [isWaitingForEnter, currentItemIndex, menuItems.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleEnter();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [handleEnter]);

  useEffect(() => {
    if (!isTyping || isWaitingForEnter) return;

    const currentItem = menuItems[currentItemIndex];
    if (!currentItem) return;

    let timeout: NodeJS.Timeout;

    if (displayText.length < currentItem.text.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentItem.text.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else {
      setIsTyping(false);
      setIsWaitingForEnter(true);
      timeout = setTimeout(() => {
        setShowEnterHint(true);
      }, enterHintDelay);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentItemIndex,
    isTyping,
    menuItems,
    typingSpeed,
    isWaitingForEnter,
    enterHintDelay,
  ]);

  return (
    <div className="space-y-8">
      <MacWindow className="max-w-3xl pb-48">
        <div className="flex items-center justify-center p-12">
          <div className="flex items-center gap-4">
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white/90 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white transition-colors"
              >
                <span className="text-black font-medium">
                  {currentCategory.name}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg py-1 z-10"
                >
                  {categories.map((category: Category) => (
                    <button
                      key={category.id}
                      className={`w-full px-4 py-2 text-left hover:bg-black/5 transition-colors ${category.id === selectedCategory ? "text-black font-medium" : "text-black/70"}`}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsDropdownOpen(false);
                        setCurrentItemIndex(0);
                        setDisplayText("");
                        setIsTyping(true);
                        setIsWaitingForEnter(false);
                        setShowEnterHint(false);
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Typewriter Input */}
            <motion.div
              className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center justify-between min-w-[300px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center flex-1">
                <span className="text-black">{displayText}</span>
                <motion.span
                  className="inline-block w-0.5 h-5 bg-black ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: cursorBlinkSpeed,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <motion.button
                onClick={handleEnter}
                className={`ml-4 pl-4 border-l border-black/10 flex items-center transition-opacity ${
                  isWaitingForEnter
                    ? "opacity-100 cursor-pointer"
                    : "opacity-50 cursor-default"
                }`}
                whileHover={isWaitingForEnter ? { scale: 1.05 } : {}}
                whileTap={isWaitingForEnter ? { scale: 0.95 } : {}}
              >
                <div className="flex items-center gap-1 text-black/80">
                  <motion.kbd
                    className="px-3 py-1 rounded bg-black/5 text-black font-medium border border-black/10 hover:bg-black/10 transition-colors"
                    animate={
                      isEnterPressed
                        ? {
                            scale: [1, 0.9, 1],
                            backgroundColor: [
                              "rgba(0,0,0,0.05)",
                              "rgba(0,0,0,0.15)",
                              "rgba(0,0,0,0.05)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.15 }}
                  >
                    ↵
                  </motion.kbd>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </MacWindow>
    </div>
  );
};

TypewriterMenuWithShortcut.title = "Interactive Typewriter";

export default TypewriterMenuWithShortcut;
