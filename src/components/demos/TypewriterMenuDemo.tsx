import { motion } from "framer-motion";
import MacWindow from "../MacWindow";
import type { DemoComponent } from "@/types/demo";
import { useConfig } from "@/context/ConfigContext";
import { useState, useEffect } from "react";
import { defaultConfig } from "@/config/defaults";
import { ConfigEditor } from "@/components/ConfigEditor";

interface MenuItem {
  id: string;
  text: string;
  href: string;
}

const TypewriterMenuDemo: DemoComponent = () => {
  const { config } = useConfig();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const menuItems =
    config?.typewriterMenu?.items || defaultConfig.typewriterMenu.items;
  const { typingSpeed, deleteSpeed, cursorBlinkSpeed } =
    config?.typewriterMenu?.animations ||
    defaultConfig.typewriterMenu.animations;

  useEffect(() => {
    const currentItem = menuItems[currentItemIndex];
    if (!currentItem) return;

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        const nextIndex = (currentItemIndex + 1) % menuItems.length;
        setCurrentItemIndex(nextIndex);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      if (displayText.length === currentItem.text.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500); // Pause at the end
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText(currentItem.text.slice(0, displayText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentItemIndex,
    isDeleting,
    menuItems,
    typingSpeed,
    deleteSpeed,
  ]);

  return (
    <div className="space-y-8">
      <MacWindow className="max-w-2xl">
        <div className="flex items-center justify-center p-12">
          <motion.div
            className="bg-white rounded-full px-6 py-3 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-black font-medium">{displayText}</span>
              <motion.span
                className="inline-block w-0.5 h-5 bg-black"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: cursorBlinkSpeed,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        </div>
      </MacWindow>
    </div>
  );
};

TypewriterMenuDemo.title = "Typewriter Menu";

export default TypewriterMenuDemo;
