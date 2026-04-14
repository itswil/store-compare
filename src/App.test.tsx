import { render } from "vitest-browser-react";
import { expect, it } from "vitest";
import App from "./App";

it("renders all 4 store sections", async () => {
  const { getByText } = await render(<App />);

  expect(getByText("Simple Store")).toBeInTheDocument();
  expect(getByText("Tanstack Store")).toBeInTheDocument();
  expect(getByText("XState Store")).toBeInTheDocument();
  expect(getByText("Zustand")).toBeInTheDocument();
});