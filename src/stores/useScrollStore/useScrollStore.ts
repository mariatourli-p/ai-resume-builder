import { create } from "zustand";

type ScrollStore = {
  scrollTarget: string | null;
  scrollTo: (section: string) => void;
  clearScrollTarget: () => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollTarget: null,
  scrollTo: (section) => set({ scrollTarget: section }),
  clearScrollTarget: () => set({ scrollTarget: null }),
}));
