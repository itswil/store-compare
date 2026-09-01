import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { describe, expect, it, beforeEach } from "vitest";
import type { ReactNode } from "react";

type ComponentStoreTestOptions = {
  name: string;
  reset: () => Promise<void> | void;
  Component: () => ReactNode;
};

export function defineStoreComponentTests({ name, reset, Component }: ComponentStoreTestOptions) {
  describe(name, () => {
    beforeEach(async () => {
      await reset();
    });

    it("renders the initial user state", async () => {
      const { getByText } = await render(<Component />);

      expect(getByText("Age: 36")).toBeInTheDocument();
      expect(getByText("Name: James")).toBeInTheDocument();
      expect(getByText("Skills: JS,Go,HTMX")).toBeInTheDocument();
    });

    it("increments age by 1 on click", async () => {
      const { getByRole, getByText } = await render(<Component />);

      const incrementButton = getByRole("button", { name: "Increment Age" });
      await incrementButton.click();

      expect(getByText("Age: 37")).toBeInTheDocument();
    });

    it("increments age multiple times", async () => {
      const { getByRole, getByText } = await render(<Component />);

      const incrementButton = getByRole("button", { name: "Increment Age" });
      await incrementButton.click();
      await incrementButton.click();
      await incrementButton.click();

      expect(getByText("Age: 39")).toBeInTheDocument();
    });

    it("updates name on submit", async () => {
      const { getByRole, getByText, container } = await render(<Component />);

      const nameInput = container.querySelector('input[name="name"]') as HTMLInputElement;
      await userEvent.fill(nameInput, "Alice");

      const submitButton = getByRole("button", { name: "Update Name" });
      await submitButton.click();

      expect(getByText("Name: Alice")).toBeInTheDocument();
    });

    it("adds skill on submit", async () => {
      const { getByRole, getByText, container } = await render(<Component />);

      const skillInput = container.querySelector('input[name="skill"]') as HTMLInputElement;
      await userEvent.fill(skillInput, "Rust");

      const submitButton = getByRole("button", { name: "Add Skill" });
      await submitButton.click();

      expect(getByText("Skills: JS,Go,HTMX,Rust")).toBeInTheDocument();
    });

    it("does not add duplicate skills", async () => {
      const { getByRole, getByText, container } = await render(<Component />);

      const skillInput = container.querySelector('input[name="skill"]') as HTMLInputElement;
      await userEvent.fill(skillInput, "JS");

      const submitButton = getByRole("button", { name: "Add Skill" });
      await submitButton.click();

      expect(getByText("Skills: JS,Go,HTMX")).toBeInTheDocument();
    });

    it("clears all skills on click", async () => {
      const { getByRole, getByText } = await render(<Component />);

      const resetButton = getByRole("button", { name: "Reset Skills" });
      await resetButton.click();

      expect(getByText("Skills: ")).toBeInTheDocument();
    });

    it("re-adds a skill after resetting", async () => {
      const { getByRole, getByText, container } = await render(<Component />);

      await getByRole("button", { name: "Reset Skills" }).click();
      expect(getByText("Skills: ")).toBeInTheDocument();

      const skillInput = container.querySelector('input[name="skill"]') as HTMLInputElement;
      await userEvent.fill(skillInput, "Go");

      await getByRole("button", { name: "Add Skill" }).click();

      expect(getByText("Skills: Go")).toBeInTheDocument();
    });
  });
}
