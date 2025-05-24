import { create } from "zustand";
import { persist } from "zustand/middleware";
import data from "./data";

export const useStore = create(persist((set)=>({
  isDark: true,
  filter: "all",
  extensionsList: data,
  setIsDark: () => set((state => ({ isDark: !state.isDark }))),
  changeFilter: (newFilter) => set({ filter: newFilter }),
  activateExtension: (name) => set((state) => ({
    extensionsList: state.extensionsList.map((extension) => 
      extension.name === name ? { ...extension, isActive: !extension.isActive } : extension
    )
  })),
  toggleAddExtension: (name) => set((state)=> ({
    extensionsList: state.extensionsList.map(extension =>{
      return extension.name === name ? { ...extension, isAdded: !extension.isAdded } : extension;
    })
  }))
})));
