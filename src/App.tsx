import { useStoreValue } from "@simplestack/store/react";
import { useStore } from "@tanstack/react-store";
import { useSelector } from "@xstate/store-react";
import { userStoreS } from "./stores/user-simple-store";
import { userStoreT } from "./stores/user-tanstack-store";
import { store as userStoreX } from "./stores/user-xstate-store";
import { useUserStoreZ } from "./stores/user-zustand";

function App() {
	// Simple Store
	const { age: ageS, name: nameS, skills: skillsS } = useStoreValue(userStoreS);

	// Tanstack Store
	const {
		age: ageT,
		name: nameT,
		skills: skillsT,
	} = useStore(userStoreT, (state) => state);
	// const ageT = useStore(userStoreT, (state) => state.age);
	// const nameT = useStore(userStoreT, (state) => state.name);
	// const skillsT = useStore(userStoreT, (state) => state.skills);

	// XState Store
	const {
		age: ageX,
		name: nameX,
		skills: skillsX,
	} = useSelector(userStoreX, (state) => state.context);
	// const ageX = useSelector(userStoreX, (state) => state.context.age);
	// const nameX = useSelector(userStoreX, (state) => state.context.name);
	// const skillsX = useSelector(userStoreX, (state) => state.context.skills);

	// Zustand
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
			<h1>Simple Store</h1>
			<div>
				<p>Age: {ageS}</p>
				<p>Name: {nameS}</p>
				<p>Skills: {skillsS.join(",")}</p>

				<input
					type="button"
					value="Increment Age"
					onClick={() => {
						userStoreS.select("age").set(ageS + 1);
					}}
				/>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						const form = event.target as HTMLFormElement;
						const formData = new FormData(form);
						userStoreS.select("name").set(formData.get("name") as string);
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
						userStoreS
							.select("skills")
							.set([...skillsS, formData.get("skill") as string]);
					}}
				>
					<input type="text" name="skill" />
					<button type="submit">Add Skill</button>
				</form>
				<button
					type="button"
					onClick={() => userStoreS.select("skills").set([])}
				>
					Reset Skills
				</button>
			</div>

			<hr />
			<h1>Tanstack Store</h1>
			<div>
				<p>Age: {ageT}</p>
				<p>Name: {nameT}</p>
				<p>Skills: {skillsT.join(",")}</p>

				<input
					type="button"
					value="Increment Age"
					onClick={() => {
						userStoreT.setState((state) => {
							return {
								...state,
								age: ageT + 1,
							};
						});
					}}
				/>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						const form = event.target as HTMLFormElement;
						const formData = new FormData(form);
						userStoreT.setState((state) => {
							return {
								...state,
								name: formData.get("name") as string,
							};
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
						userStoreT.setState((state) => {
							return {
								...state,
								skills: [...state.skills, formData.get("skill") as string],
							};
						});
					}}
				>
					<input type="text" name="skill" />
					<button type="submit">Add Skill</button>
				</form>
				<button
					type="button"
					onClick={() =>
						userStoreT.setState((state) => {
							return {
								...state,
								skills: [],
							};
						})
					}
				>
					Reset Skills
				</button>
			</div>

			<hr />
			<h1>XState Store</h1>
			<div>
				<p>Age: {ageX}</p>
				<p>Name: {nameX}</p>
				<p>Skills: {skillsX.join(",")}</p>

				<input
					type="button"
					value="Increment Age"
					onClick={() => {
						userStoreX.trigger.incrementAge();
					}}
				/>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						const form = event.target as HTMLFormElement;
						const formData = new FormData(form);
						userStoreX.trigger.updateName({
							newName: formData.get("name") as string,
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
						userStoreX.trigger.addSkill({
							newSkill: formData.get("skill") as string,
						});
					}}
				>
					<input type="text" name="skill" />
					<button type="submit">Add Skill</button>
				</form>
				<button type="button" onClick={() => userStoreX.trigger.resetSkills()}>
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
