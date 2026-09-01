import { userStore } from "../stores/user-xstate-store";
import { XStateStoreComponent } from "./XStateStoreComponent";
import { defineStoreComponentTests } from "../test-utils/componentStoreTests";

defineStoreComponentTests({
  name: "XState Store",
  Component: XStateStoreComponent,
  reset: async () => {
    userStore.trigger.reset();
  },
});
