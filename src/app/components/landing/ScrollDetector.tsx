"use client";

import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";

interface ScrollContextType {
  currentPage: string;
}

const ScrollContext = createContext<ScrollContextType>({
  currentPage: "about",
});

export const useCurrentPage = () => {
  const context = useContext(ScrollContext);
  return context.currentPage;
};

interface ScrollDetectorProps {
  children: ReactNode;
}

const ScrollDetector = ({ children }: ScrollDetectorProps) => {
  const [currentPage, setCurrentPage] = useState("about");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when element is in the middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "experience") {
            setCurrentPage("experience");
          }
        } else {
          // If experience section is not intersecting and we're scrolled past it
          const experienceElement = document.getElementById("experience");
          if (experienceElement) {
            const rect = experienceElement.getBoundingClientRect();
            // If the experience section is below the viewport, we're in the about section
            if (rect.top > window.innerHeight / 2) {
              setCurrentPage("about");
            }
          }
        }
      });
    }, observerOptions);

    // Start observing the experience section after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const experienceElement = document.getElementById("experience");
      if (experienceElement) {
        observer.observe(experienceElement);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ currentPage }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollDetector;
