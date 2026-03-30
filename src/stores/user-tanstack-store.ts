import { createStore } from "@tanstack/react-store";

export const userStore = createStore({
  age: 36,
  name: "James",
  skills: ["JS", "Go", "HTMX"],
});
