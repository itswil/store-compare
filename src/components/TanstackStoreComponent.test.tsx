import { userStore } from "../stores/user-tanstack-store";
import { TanstackStoreComponent } from "./TanstackStoreComponent";
import { defineStoreComponentTests } from "../test-utils/componentStoreTests";

defineStoreComponentTests({
  name: "Tanstack Store",
  Component: TanstackStoreComponent,
  reset: async () => {
    userStore.setState(() => ({
      age: 36,
      name: "James",
      skills: ["JS", "Go", "HTMX"],
    }));
  },
});
