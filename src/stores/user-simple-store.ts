import { store } from "@simplestack/store";

export const userStore = store({
  age: 36,
  name: "James",
  skills: ["JS", "Go", "HTMX"],
});
