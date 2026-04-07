import { createStore } from "@xstate/store-react";

const initialState = {
  age: 36,
  name: "James",
  skills: ["JS", "Go", "HTMX"],
}

export const userStore = createStore({
  // context
  context: initialState,
  // transitions
  on: {
    incrementAge: (context) => ({ ...context, age: context.age + 1 }),
    updateName: (context, event: { newName: string }) => ({
      ...context,
      name: event.newName,
    }),
    addSkill: (context, event: { newSkill: string }) => {
      if (!context.skills.includes(event.newSkill)) {
        return { ...context, skills: [...context.skills, event.newSkill] };
      }
      return context;
    },
    resetSkills: (context) => ({ ...context, skills: [] }),
    reset: () => initialState
  },
});
