import { useStoreValue } from "@simplestack/store/react";
import { userStore } from "../stores/user-simple-store";

export function SimpleStoreComponent() {
  const { age, name, skills } = useStoreValue(userStore);
  
  return (
    <div>
      <h2>Simple Store</h2>
      <p>Age: {age}</p>
      <p>Name: {name}</p>
      <p>Skills: {skills.join(",")}</p>

      <input
        type="button"
        value="Increment Age"
        onClick={() => userStore.select("age").set(age + 1)}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          userStore.select("name").set(formData.get("name") as string);
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
          userStore
            .select("skills")
            .set(!skills.includes(newSkill) ? [...skills, newSkill] : [...skills]);
        }}
      >
        <input type="text" name="skill" />
        <button type="submit">Add Skill</button>
      </form>
      <button type="button" onClick={() => userStore.select("skills").set([])}>
        Reset Skills
      </button>
    </div>
  );
}
