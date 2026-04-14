import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { expect, it, beforeEach } from "vitest";
import { userStore } from "../stores/user-simple-store";
import { SimpleStoreComponent } from "./SimpleStoreComponent";

beforeEach(async () => {
  userStore.select("age").set(36);
  userStore.select("name").set("James");
  userStore.select("skills").set(["JS", "Go", "HTMX"]);
});

it("increments age by 1 on click", async () => {
  const { getByRole, getByText } = await render(<SimpleStoreComponent />);

  const ageElement = getByText("Age: 36");
  expect(ageElement).toBeInTheDocument();

  const incrementButton = getByRole("button", { name: "Increment Age" });
  await incrementButton.click();

  expect(getByText("Age: 37")).toBeInTheDocument();
});

it("increments age multiple times", async () => {
  const { getByRole, getByText } = await render(<SimpleStoreComponent />);

  const incrementButton = getByRole("button", { name: "Increment Age" });
  await incrementButton.click();
  await incrementButton.click();
  await incrementButton.click();

  expect(getByText("Age: 39")).toBeInTheDocument();
});

it("updates name on submit", async () => {
  const { getByRole, getByText, container } = await render(<SimpleStoreComponent />);

  const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
  await userEvent.fill(nameInput, "Alice");

  const submitButton = getByRole("button", { name: "Update Name" });
  await submitButton.click();

  expect(getByText("Name: Alice")).toBeInTheDocument();
});

it("adds skill on submit", async () => {
  const { getByRole, getByText, container } = await render(<SimpleStoreComponent />);

  const skillInput = container.querySelector('input[name="skill"]') as HTMLInputElement;
  await userEvent.fill(skillInput, "Rust");

  const submitButton = getByRole("button", { name: "Add Skill" });
  await submitButton.click();

  expect(getByText("Skills: JS,Go,HTMX,Rust")).toBeInTheDocument();
});

it("does not add duplicate skills", async () => {
  const { getByRole, getByText, container } = await render(<SimpleStoreComponent />);

  const skillInput = container.querySelector('input[name="skill"]') as HTMLInputElement;
  await userEvent.fill(skillInput, "JS");

  const submitButton = getByRole("button", { name: "Add Skill" });
  await submitButton.click();

  expect(getByText("Skills: JS,Go,HTMX")).toBeInTheDocument();
});

it("clears all skills on click", async () => {
  const { getByRole, getByText } = await render(<SimpleStoreComponent />);

  const resetButton = getByRole("button", { name: "Reset Skills" });
  await resetButton.click();

  expect(getByText("Skills: ")).toBeInTheDocument();
});
