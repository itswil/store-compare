import { useSelector } from "@xstate/store-react";
import { userStore } from "../stores/user-xstate-store";

export function XStateStoreComponent() {
	const { age, name, skills } = useSelector(
		userStore,
		(state) => state.context,
	);

	return (
		<div>
			<h2>XState Store</h2>
			<p>Age: {age}</p>
			<p>Name: {name}</p>
			<p>Skills: {skills.join(",")}</p>

			<input
				type="button"
				value="Increment Age"
				onClick={() => userStore.trigger.incrementAge()}
			/>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const form = event.target as HTMLFormElement;
					const formData = new FormData(form);
					userStore.trigger.updateName({
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
					userStore.trigger.addSkill({
						newSkill: formData.get("skill") as string,
					});
				}}
			>
				<input type="text" name="skill" />
				<button type="submit">Add Skill</button>
			</form>
			<button type="button" onClick={() => userStore.trigger.resetSkills()}>
				Reset Skills
			</button>
		</div>
	);
}
