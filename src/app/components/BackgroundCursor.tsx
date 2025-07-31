"use client";

import React, { useState, useEffect } from "react";
import useBackgroundCursorPosition from "use-bg-cursor-pos";

interface BackgroundCursorProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundCursor: React.FC<BackgroundCursorProps> = ({
  children,
  className = "",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial color scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Define colors based on theme
  const colors = isDarkMode
    ? { bg1: "#111", bg2: "#111" } // Dark mode colors (original)
    : { bg1: "#fff", bg2: "#fff" }; // Light mode colors (slightly darker than background)

  const [el, bg] = useBackgroundCursorPosition(colors.bg1, colors.bg2, "400px");

  return (
    <div
      ref={el as React.RefObject<HTMLDivElement>}
      style={{ background: bg }}
      className={className}
    >
      {children}
    </div>
  );
};

export default BackgroundCursor;
