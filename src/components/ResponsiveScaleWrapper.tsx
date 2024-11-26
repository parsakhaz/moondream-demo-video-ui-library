import { useEffect, useState } from "react";

interface ResponsiveScaleWrapperProps {
  children: React.ReactNode;
  minWidth?: number; // minimum width the content is designed for
}

export function ResponsiveScaleWrapper({
  children,
  minWidth = 320, // default minimum width
}: ResponsiveScaleWrapperProps) {
  const [scale, setScale] = useState(1);
  const [wrapperWidth, setWrapperWidth] = useState("100%");

  useEffect(() => {
    const updateScale = () => {
      // Only scale on mobile devices
      if (window.innerWidth >= 1024) {
        setScale(1);
        setWrapperWidth("100%");
        return;
      }

      const screenWidth = window.innerWidth;
      if (screenWidth < minWidth) {
        const newScale = screenWidth / minWidth;
        setScale(newScale);
        // Inverse scale the wrapper width to maintain proper dimensions
        setWrapperWidth(`${(100 / newScale)}%`);
      } else {
        setScale(1);
        setWrapperWidth("100%");
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [minWidth]);

  if (scale === 1) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        width: wrapperWidth,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
} 