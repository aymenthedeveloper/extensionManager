import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import data from "./data";

export const useStore = create(persist((set)=>({
  isDark: true,
  filter: "all",
  extensionsList: data,
  setIsDark: () => set((state => ({ isDark: !state.isDark }))),
  changeFilter: (newFilter) => set({ filter: newFilter }, false, "changeFilter"),
  updateExtension: (name, newData) => set((state)=> ({
    extensionsList: state.extensionsList.map(ext =>{
      return ext.name === name ? { ...ext, ...newData} : ext;
    })
  })),
}))
);
