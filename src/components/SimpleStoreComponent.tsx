import { useStoreValue } from "@simplestack/store/react";
import { userStore } from "../stores/user-simple-store";

export function SimpleStoreComponent() {
  const { age, name, skills } = useStoreValue(userStore);

  return (
    <section className="section">
      <h2>Simple Store</h2>
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

      <div className="controls">
        <input
          type="button"
          value="Increment Age"
          name="Increment Age"
          onClick={() => userStore.select("age").set(age + 1)}
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            userStore.select("name").set(formData.get("name") as string);
            form.reset();
          }}
        >
          <input type="text" name="name" placeholder="Enter name" autoComplete="off" />
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
            form.reset();
          }}
        >
          <input type="text" name="skill" placeholder="Enter skill" autoComplete="off" />
          <button type="submit">Add Skill</button>
        </form>
        <button type="button" onClick={() => userStore.select("skills").set([])}>
          Reset Skills
        </button>
      </div>
    </section>
  );
}
