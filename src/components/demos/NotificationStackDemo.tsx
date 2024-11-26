import { motion, AnimatePresence } from "framer-motion";
import { MacWindow } from "../MacWindow";
import type { DemoComponent } from "@/types/demo";
import { useConfig } from "@/context/ConfigContext";
import { useState, useEffect } from "react";
import { defaultConfig } from "@/config/defaults";

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  icon?: string;
  duration?: number;
}

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "warning":
      return "⚠️";
    case "info":
      return "ℹ️";
  }
};

const getColors = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-500/20 border-green-500/50";
    case "error":
      return "bg-red-500/20 border-red-500/50";
    case "warning":
      return "bg-yellow-500/20 border-yellow-500/50";
    case "info":
      return "bg-blue-500/20 border-blue-500/50";
  }
};

const NotificationStackDemo: DemoComponent = () => {
  const { config } = useConfig();
  const [activeNotifications, setActiveNotifications] = useState<string[]>([]);
  const [isResetting, setIsResetting] = useState(false);

  const notifications =
    config?.notificationStack?.notifications ||
    defaultConfig.notificationStack.notifications;
  const position =
    config?.notificationStack?.position ||
    defaultConfig.notificationStack.position;
  const maxNotifications =
    config?.notificationStack?.maxNotifications ||
    defaultConfig.notificationStack.maxNotifications;

  const {
    animations: { enterDuration, exitDuration, staggerDelay, slideDistance },
    style: { spacing, maxWidth, opacity, blur },
  } = config?.notificationStack || defaultConfig.notificationStack;

  // Auto-show notifications in sequence
  useEffect(() => {
    if (isResetting) return;

    const showNextNotification = (index: number) => {
      if (index >= notifications.length) {
        setIsResetting(true);
        setTimeout(() => {
          setActiveNotifications([]);
          setIsResetting(false);
        }, 1000);
        return;
      }

      setActiveNotifications((prev) => [...prev, notifications[index].id]);

      const duration = notifications[index].duration || 3000;
      setTimeout(() => {
        setActiveNotifications((prev) =>
          prev.filter((id) => id !== notifications[index].id),
        );
        setTimeout(() => showNextNotification(index + 1), 500);
      }, duration);
    };

    showNextNotification(0);
  }, [notifications, isResetting]);

  const positionClasses = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
  };

  return (
    <MacWindow className="max-w-4xl h-[400px]">
      <div className="relative w-full h-full">
        {/* Demo Content Background */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg font-mono">
          Demo Content Area
        </div>

        {/* Notification Container */}
        <div
          className={`absolute ${positionClasses[position]} flex flex-col`}
          style={
            {
              gap: `${spacing}px`,
              maxWidth,
              "--blur-amount": blur,
            } as any
          }
        >
          <AnimatePresence>
            {notifications
              .filter((n) => activeNotifications.includes(n.id))
              .slice(0, maxNotifications)
              .map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{
                    opacity: 0,
                    x: position.includes("right")
                      ? slideDistance
                      : -slideDistance,
                  }}
                  animate={{
                    opacity,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: position.includes("right")
                      ? slideDistance
                      : -slideDistance,
                  }}
                  transition={{
                    duration: enterDuration,
                    exit: { duration: exitDuration },
                    delay: index * staggerDelay,
                  }}
                  style={{
                    backdropFilter: `blur(${blur})`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {getIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm">
                        {notification.title}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </MacWindow>
  );
};

NotificationStackDemo.title = "Notification Stack";

export default NotificationStackDemo;
