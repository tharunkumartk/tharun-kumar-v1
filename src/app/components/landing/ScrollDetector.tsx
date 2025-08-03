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
          const sectionId = entry.target.id;
          if (
            sectionId === "experience" ||
            sectionId === "projects" ||
            sectionId === "blog"
          ) {
            setCurrentPage(sectionId);
          }
        }
      });

      // If no sections are intersecting, determine current page based on scroll position
      const intersectingSections = entries.filter(
        (entry) => entry.isIntersecting
      );
      if (intersectingSections.length === 0) {
        const sections = ["experience", "projects", "blog"];
        let currentSection = "about";

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If section is above the middle of viewport, we've scrolled past it
            if (rect.top <= window.innerHeight / 2) {
              currentSection = sectionId;
            } else {
              break;
            }
          }
        }

        setCurrentPage(currentSection);
      }
    }, observerOptions);

    // Start observing all sections after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const sectionsToObserve = ["experience", "projects", "blog"];
      sectionsToObserve.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
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
