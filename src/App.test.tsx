/** biome-ignore-all lint/style/noNonNullAssertion: elements exist */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { userStoreS } from "./stores/user-simple-store";

describe("App", () => {
	beforeEach(() => {
		userStoreS.select("age").set(36);
		userStoreS.select("name").set("James");
		userStoreS.select("skills").set(["JS", "Go", "HTMX"]);
	});

	const getSimpleStoreSection = () => {
		const sections = screen.getAllByText("Simple Store");
		return sections[0].parentElement;
	};

	const getTanstackStoreSection = () => {
		const sections = screen.getAllByText("Tanstack Store");
		return sections[0].parentElement;
	};

	const getXStateStoreSection = () => {
		const sections = screen.getAllByText("XState Store");
		return sections[0].parentElement;
	};

	const getZustandSection = () => {
		const sections = screen.getAllByText("Zustand");
		return sections[0].parentElement;
	};

	describe("Simple Store", () => {
		it("increments age by 1 on click", async () => {
			render(<App />);
			const section = getSimpleStoreSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 37");
		});

		it("increments age multiple times", async () => {
			render(<App />);
			const section = getSimpleStoreSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 39");
		});

		it("updates name on submit", async () => {
			render(<App />);
			const section = getSimpleStoreSection();
			const nameInput = section?.querySelector(
				'input[name="name"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(nameInput, { target: { value: "Alice" } });
			});

			const form = section?.querySelector("form");
			await act(async () => {
				fireEvent.submit(form!);
			});

			const nameElement = section?.querySelectorAll("p")[1];
			expect(nameElement?.textContent).toBe("Name: Alice");
		});

		it("adds skill on submit", async () => {
			render(<App />);
			const section = getSimpleStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "Rust" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX,Rust");
		});

		it("does not add duplicate skills", async () => {
			render(<App />);
			const section = getSimpleStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "JS" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX");
		});

		it("clears all skills on click", async () => {
			render(<App />);
			const section = getSimpleStoreSection();
			const resetButton = section?.querySelector('button[type="button"]');

			await act(async () => {
				fireEvent.click(resetButton!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: ");
		});
	});

	describe("Tanstack Store", () => {
		it("increments age by 1 on click", async () => {
			render(<App />);
			const section = getTanstackStoreSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 37");
		});

		it("increments age multiple times", async () => {
			render(<App />);
			const section = getTanstackStoreSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 39");
		});

		it("updates name on submit", async () => {
			render(<App />);
			const section = getTanstackStoreSection();
			const nameInput = section?.querySelector(
				'input[name="name"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(nameInput, { target: { value: "Alice" } });
			});

			const form = section?.querySelector("form");
			await act(async () => {
				fireEvent.submit(form!);
			});

			const nameElement = section?.querySelectorAll("p")[1];
			expect(nameElement?.textContent).toBe("Name: Alice");
		});

		it("adds skill on submit", async () => {
			render(<App />);
			const section = getTanstackStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "Rust" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX,Rust");
		});

		it("does not add duplicate skills", async () => {
			render(<App />);
			const section = getTanstackStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "JS" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX");
		});

		it("clears all skills on click", async () => {
			render(<App />);
			const section = getTanstackStoreSection();
			const resetButton = section?.querySelector('button[type="button"]');

			await act(async () => {
				fireEvent.click(resetButton!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: ");
		});
	});

	describe("XState Store", () => {
		it("increments age by 1 on click", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 37");
		});

		it("increments age multiple times", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 39");
		});

		it("updates name on submit", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const nameInput = section?.querySelector(
				'input[name="name"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(nameInput, { target: { value: "Alice" } });
			});

			const form = section?.querySelector("form");
			await act(async () => {
				fireEvent.submit(form!);
			});

			const nameElement = section?.querySelectorAll("p")[1];
			expect(nameElement?.textContent).toBe("Name: Alice");
		});

		it("adds skill on submit", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "Rust" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX,Rust");
		});

		it("does not add duplicate skills", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "JS" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX");
		});

		it("clears all skills on click", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const resetButton = section?.querySelector('button[type="button"]');

			await act(async () => {
				fireEvent.click(resetButton!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: ");
		});
	});

	describe("Zustand", () => {
		it("increments age by 1 on click", async () => {
			render(<App />);
			const section = getZustandSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 37");
		});

		it("increments age multiple times", async () => {
			render(<App />);
			const section = getZustandSection();
			const incrementButton = section?.querySelector(
				'input[value="Increment Age"]',
			);

			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});
			await act(async () => {
				fireEvent.click(incrementButton!);
			});

			const ageElement = section?.querySelector("p");
			expect(ageElement?.textContent).toBe("Age: 39");
		});

		it("updates name on submit", async () => {
			render(<App />);
			const section = getZustandSection();
			const nameInput = section?.querySelector(
				'input[name="name"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(nameInput, { target: { value: "Alice" } });
			});

			const form = section?.querySelector("form");
			await act(async () => {
				fireEvent.submit(form!);
			});

			const nameElement = section?.querySelectorAll("p")[1];
			expect(nameElement?.textContent).toBe("Name: Alice");
		});

		it("adds skill on submit", async () => {
			render(<App />);
			const section = getXStateStoreSection();
			const skillInput = section?.querySelector(
				'input[name="skill"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "Rust" } });
			});

			const form = section?.querySelectorAll("form")[1];
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX,Rust");
		});

		it("does not add duplicate skills", async () => {
			render(<App />);
			const section = getZustandSection();
			const skillInput = section?.querySelector(
				'input[name="skills"]',
			) as HTMLInputElement;

			await act(async () => {
				fireEvent.change(skillInput, { target: { value: "JS" } });
			});

			const form = section?.querySelector("form");
			await act(async () => {
				fireEvent.submit(form!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: JS,Go,HTMX");
		});

		it("clears all skills on click", async () => {
			render(<App />);
			const section = getZustandSection();
			const resetButton = section?.querySelector('button[type="button"]');

			await act(async () => {
				fireEvent.click(resetButton!);
			});

			const skillsElement = section?.querySelectorAll("p")[2];
			expect(skillsElement?.textContent).toBe("Skills: ");
		});
	});
});
