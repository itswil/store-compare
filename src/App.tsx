import { SimpleStoreComponent } from "./components/SimpleStoreComponent";
import { TanstackStoreComponent } from "./components/TanstackStoreComponent";
import { XStateStoreComponent } from "./components/XStateStoreComponent";
import { ZustandStoreComponent } from "./components/ZustandStoreComponent";

function App() {
  return (
    <div className="container">
      <SimpleStoreComponent />
      <TanstackStoreComponent />
      <XStateStoreComponent />
      <ZustandStoreComponent />
    </div>
  );
}

export default App;
