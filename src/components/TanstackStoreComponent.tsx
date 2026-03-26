import { useStore } from "@tanstack/react-store";
import { userStoreT } from "../stores/user-tanstack-store";

export function TanstackStoreComponent() {
	const { age, name, skills } = useStore(userStoreT, (state) => state);

	return (
		<div>
			<h2>Tanstack Store</h2>
			<p>Age: {age}</p>
			<p>Name: {name}</p>
			<p>Skills: {skills.join(",")}</p>

			<input
				type="button"
				value="Increment Age"
				onClick={() => {
					userStoreT.setState((state) => ({ ...state, age: age + 1 }));
				}}
			/>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const form = event.target as HTMLFormElement;
					const formData = new FormData(form);
					userStoreT.setState((state) => ({
						...state,
						name: formData.get("name") as string,
					}));
				}}
			>
				<input type="text" name="name" />
				<button type="submit">Update Name</button>
			</form>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const form = event.target as HTMLFormElement;
					const formData = new FormData(form);
					const newSkill = formData.get("skill") as string;
					userStoreT.setState((state) =>
						state.skills.includes(newSkill)
							? state
							: { ...state, skills: [...state.skills, newSkill] },
					);
				}}
			>
				<input type="text" name="skill" />
				<button type="submit">Add Skill</button>
			</form>
			<button
				type="button"
				onClick={() => userStoreT.setState((state) => ({ ...state, skills: [] }))}
			>
				Reset Skills
			</button>
		</div>
	);
}