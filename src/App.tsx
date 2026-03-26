import { SimpleStoreComponent } from "./components/SimpleStoreComponent";
import { TanstackStoreComponent } from "./components/TanstackStoreComponent";
import { XStateStoreComponent } from "./components/XStateStoreComponent";
import { ZustandStoreComponent } from "./components/ZustandStoreComponent";

function App() {
	return (
		<>
			<SimpleStoreComponent />
			<hr />
			<TanstackStoreComponent />
			<hr />
			<XStateStoreComponent />
			<hr />
			<ZustandStoreComponent />
		</>
	);
}

export default App;