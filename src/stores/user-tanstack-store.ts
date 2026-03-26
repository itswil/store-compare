import { createStore } from "@tanstack/react-store";

export const userStoreT = createStore({
	age: 36,
	name: "James",
	skills: ["JS", "Go", "HTMX"],
});
