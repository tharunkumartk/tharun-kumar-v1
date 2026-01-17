import { useState, useMemo, useCallback, useEffect } from "react";
import { BlogPost } from "@/lib/types";
import { msg } from "gt-next";

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
  { value: "newest", label: msg("Newest → Oldest") },
  { value: "oldest", label: msg("Oldest → Newest") },
  { value: "alphabetical", label: msg("Alphabetical (A-Z)") },
  { value: "reverse-alphabetical", label: msg("Alphabetical (Z-A)") },
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

  // Memoize the filter function to avoid recreating on every render
  const filterFunction = useMemo(() => {
    if (selectedTags.length === 0) return null;
    return (post: BlogPost) =>
      selectedTags.some((selectedTag) => post.tags?.includes(selectedTag));
  }, [selectedTags]);

  // Memoize the sort function to avoid recreating on every render
  const sortFunction = useMemo(() => {
    switch (sortOrder) {
      case "newest":
        return (a: BlogPost, b: BlogPost) =>
          a.timestamp < b.timestamp ? 1 : -1;
      case "oldest":
        return (a: BlogPost, b: BlogPost) =>
          a.timestamp > b.timestamp ? 1 : -1;
      case "alphabetical":
        return (a: BlogPost, b: BlogPost) => a.title.localeCompare(b.title);
      case "reverse-alphabetical":
        return (a: BlogPost, b: BlogPost) => b.title.localeCompare(a.title);
      default:
        return () => 0;
    }
  }, [sortOrder]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    // Apply filtering
    const filtered = filterFunction ? posts.filter(filterFunction) : posts;

    // Apply sorting - create a copy only if we have items to sort
    if (filtered.length === 0) return filtered;
    return [...filtered].sort(sortFunction);
  }, [posts, filterFunction, sortFunction]);

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

  // Optimize click outside handler to avoid recreating on every openDropdown change
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    const isFilterDropdown = target.closest(".filter-dropdown");
    const isSortDropdown = target.closest(".sort-dropdown");

    // Close any dropdown if clicking outside of all dropdowns
    if (!isFilterDropdown && !isSortDropdown) {
      setOpenDropdown(null);
    }
  }, []);

  useEffect(() => {
    if (openDropdown) {
      document.addEventListener("click", handleClickOutside, { passive: true });
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
