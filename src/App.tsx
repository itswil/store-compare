import { store as userStoreX, useUserX } from "./stores/user-xstate-store";
import { useUserStoreZ } from "./stores/user-zustand";

function App() {
	const { age: ageX, name: nameX, skills: skillsX } = useUserX();

	const {
		age: ageZ,
		name: nameZ,
		skills: skillsZ,
		incrementAge: incrementAgeZ,
		updateName: updateNameZ,
		addSkill: addSkillZ,
		resetSkills: resetSkillsZ,
	} = useUserStoreZ();

	return (
		<>
			<h1>XState Store</h1>
			<div>
				<p>Age: {ageX}</p>
				<p>Name: {nameX}</p>
				<p>Skills: {skillsX.join(",")}</p>

				<input
					type="button"
					value="Increment Age"
					onClick={() => {
						userStoreX.send({ type: "incrementAge", by: 1 });
					}}
				/>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						const form = event.target as HTMLFormElement;
						const formData = new FormData(form);
						userStoreX.send({
							type: "updateName",
							newName: (formData.get("name") as string) || "",
						});
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
						userStoreX.send({
							type: "addSkill",
							newSkill: (formData.get("skill") as string) || "",
						});
					}}
				>
					<input type="text" name="skill" />
					<button type="submit">Add Skill</button>
				</form>
				<button
					type="button"
					onClick={() => userStoreX.send({ type: "resetSkills" })}
				>
					Reset Skills
				</button>
			</div>

			<hr />

			<h1>Zustand</h1>
			<div>
				<p>Age: {ageZ}</p>
				<p>Name: {nameZ}</p>
				<p>Skills: {skillsZ.join(",")}</p>

				<input
					type="button"
					value="Increment Age"
					onClick={() => {
						incrementAgeZ(1);
					}}
				/>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						const form = event.target as HTMLFormElement;
						const formData = new FormData(form);
						updateNameZ(formData.get("name") as string);
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
						addSkillZ(formData.get("skills") as string);
					}}
				>
					<input type="text" name="skills" />
					<button type="submit">Add Skill</button>
				</form>
				<button type="button" onClick={() => resetSkillsZ()}>
					Reset Skills
				</button>
			</div>
		</>
	);
}

export default App;
