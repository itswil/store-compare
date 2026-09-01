import { userStore } from "../stores/user-simple-store";
import { SimpleStoreComponent } from "./SimpleStoreComponent";
import { defineStoreComponentTests } from "../test-utils/componentStoreTests";

defineStoreComponentTests({
  name: "Simple Store",
  Component: SimpleStoreComponent,
  reset: async () => {
    userStore.select("age").set(36);
    userStore.select("name").set("James");
    userStore.select("skills").set(["JS", "Go", "HTMX"]);
  },
});
