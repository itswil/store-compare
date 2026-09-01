import { useUserStore } from "../stores/user-zustand";
import { ZustandStoreComponent } from "./ZustandStoreComponent";
import { defineStoreComponentTests } from "../test-utils/componentStoreTests";

defineStoreComponentTests({
  name: "Zustand",
  Component: ZustandStoreComponent,
  reset: async () => {
    useUserStore.setState({
      age: 36,
      name: "James",
      skills: ["JS", "Go", "HTMX"],
    });
  },
});
