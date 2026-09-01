import { useSelector } from "@xstate/store-react";
import { userStore } from "../stores/user-xstate-store";

export function XStateStoreComponent() {
  const { age, name, skills } = useSelector(userStore, (state) => state.context);

  return (
    <div>
      <h2>XState Store</h2>
      <p>Age: {age}</p>
      <p>Name: {name}</p>
      <div>
        <span>Skills: </span>
        {skills.length > 0 ? (
          <ul>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        ) : (
          <span>none</span>
        )}
      </div>

      <input type="button" value="Increment Age" onClick={() => userStore.trigger.incrementAge()} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          userStore.trigger.updateName({
            newName: formData.get("name") as string,
          });
          form.reset();
        }}
      >
        <input type="text" name="name" placeholder="Enter name" />
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
          form.reset();
        }}
      >
        <input type="text" name="skill" placeholder="Enter skill" />
        <button type="submit">Add Skill</button>
      </form>
      <button type="button" onClick={() => userStore.trigger.resetSkills()}>
        Reset Skills
      </button>
    </div>
  );
}
