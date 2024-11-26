import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useConfig } from "@/context/ConfigContext";

export function CustomCursor() {
  const { config } = useConfig();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 25 });

  // Use springs for smooth cursor movement
  const mouseX = useSpring(0, { stiffness: 1000, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 1000, damping: 50 });

  // Transform the spring values into CSS transform, including scale
  const transform = useTransform(
    [mouseX, mouseY, scaleSpring],
    ([x, y, scale]) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
  );

  useEffect(() => {
    document.body.setAttribute(
      "data-custom-cursor",
      String(config?.macWindow?.customCursor ?? false),
    );
    return () => document.body.removeAttribute("data-custom-cursor");
  }, [config?.macWindow?.customCursor]);

  useEffect(() => {
    let rafId: number;

    const updatePosition = (e: MouseEvent) => {
      setIsVisible(true);

      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        const target = e.target as HTMLElement;
        const isInteractive =
          target.matches('a, button, input, select, [role="button"]') ||
          target.closest('a, button, input, select, [role="button"]') !== null;
        setIsOverInteractive(isInteractive);
      });
    };

    const handleMouseDown = () => {
      setClicked(true);
      // Animate scale spring to create smooth zoom effect
      animate(scaleSpring, 0.05, {
        duration: 0.15,
        onComplete: () => {
          animate(scaleSpring, 1, {
            duration: 0.15,
            onComplete: () => setClicked(false),
          });
        },
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, scaleSpring]);

  if (!config?.macWindow?.customCursor) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor-emoji"
      style={{
        position: "fixed",
        left: -15,
        top: -15,
        pointerEvents: "none",
        transform,
        opacity: isVisible ? 1 : 0,
        zIndex: 9999,
      }}
    >
      {isOverInteractive ? "🌕" : "🌙"}
    </motion.div>
  );
}
