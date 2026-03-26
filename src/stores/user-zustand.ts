import { create } from "zustand";

type Store = {
	age: number;
	name: string;
	skills: string[];
	incrementAge: (by: number) => void;
	updateName: (newName: string) => void;
	addSkill: (newSkill: string) => void;
	resetSkills: () => void;
};

export const useUserStore = create<Store>((set) => ({
	age: 36,
	name: "James",
	skills: ["JS", "Go", "HTMX"],
	incrementAge: (by) => set((state) => ({ age: state.age + by })),
	updateName: (newName) => set({ name: newName }),
	addSkill: (newSkill) =>
		set((state) => ({
			skills: state.skills.includes(newSkill)
				? state.skills
				: [...state.skills, newSkill],
		})),
	resetSkills: () => set({ skills: [] }),
}));
