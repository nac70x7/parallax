import { create } from "zustand";

/**
 * Zustand store for Parallax
 * 
 * Global state management for app-wide state
 */

interface AppState {
  // Theme (even though we default to dark)
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;

  // Search history
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Active research
  activeResearchId: string | null;
  setActiveResearchId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Theme
  isDarkMode: true,
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),

  // Search history
  recentSearches: [],
  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [
        query,
        ...state.recentSearches.filter((q) => q !== query),
      ].slice(0, 10), // Keep last 10
    })),
  clearRecentSearches: () => set({ recentSearches: [] }),

  // Active research
  activeResearchId: null,
  setActiveResearchId: (id) => set({ activeResearchId: id }),
}));
