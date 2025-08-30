import { useState, useMemo, useCallback, useEffect } from "react";
import { BlogPost } from "@/lib/types";

// Type definitions
export type SortOrder =
  | "newest"
  | "oldest"
  | "alphabetical"
  | "reverse-alphabetical";
export type ViewMode = "grid" | "list";
export type DropdownType = "filter" | "sort" | null;

// Sort options configuration
export const SORT_OPTIONS: Array<{ value: SortOrder; label: string }> = [
  { value: "newest", label: "Newest → Oldest" },
  { value: "oldest", label: "Oldest → Newest" },
  { value: "alphabetical", label: "Alphabetical (A-Z)" },
  { value: "reverse-alphabetical", label: "Alphabetical (Z-A)" },
];

// Custom hook for blog filtering and sorting
export function useBlogFilters(posts: BlogPost[]) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = posts.filter((post) =>
        selectedTags.some((selectedTag) => post.tags?.includes(selectedTag))
      );
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return a.timestamp < b.timestamp ? 1 : -1;
        case "oldest":
          return a.timestamp > b.timestamp ? 1 : -1;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "reverse-alphabetical":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [posts, selectedTags, sortOrder]);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedTags([]);
  }, []);

  return {
    selectedTags,
    sortOrder,
    setSortOrder,
    allTags,
    filteredAndSortedPosts,
    handleTagToggle,
    handleClearFilters,
  };
}

// Custom hook for dropdown state management
export function useDropdownState() {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        openDropdown === "filter" &&
        !(event.target as Element).closest(".filter-dropdown")
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === "sort" &&
        !(event.target as Element).closest(".sort-dropdown")
      ) {
        setOpenDropdown(null);
      }
    },
    [openDropdown]
  );

  useEffect(() => {
    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown, handleClickOutside]);

  const toggleDropdown = useCallback((type: DropdownType) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  }, []);

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  return {
    openDropdown,
    toggleDropdown,
    closeDropdown,
  };
}
