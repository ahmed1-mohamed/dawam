import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  selectedRoleFilter: string;
  selectedStatusFilter: string;
  tableSearchQuery: string;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSelectedRoleFilter: (role: string) => void;
  setSelectedStatusFilter: (status: string) => void;
  setTableSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileMenuOpen: false,
      selectedRoleFilter: "all",
      selectedStatusFilter: "all",
      tableSearchQuery: "",
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed: boolean) =>
        set({ sidebarCollapsed: collapsed }),
      setMobileMenuOpen: (open: boolean) =>
        set({ mobileMenuOpen: open }),
      setSelectedRoleFilter: (role: string) =>
        set({ selectedRoleFilter: role }),
      setSelectedStatusFilter: (status: string) =>
        set({ selectedStatusFilter: status }),
      setTableSearchQuery: (query: string) =>
        set({ tableSearchQuery: query }),
      resetFilters: () =>
        set({
          selectedRoleFilter: "all",
          selectedStatusFilter: "all",
          tableSearchQuery: "",
        }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
