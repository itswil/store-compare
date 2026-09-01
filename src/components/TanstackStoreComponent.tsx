import { useSelector } from "@tanstack/react-store";
import { userStore } from "../stores/user-tanstack-store";

export function TanstackStoreComponent() {
  const age = useSelector(userStore, (state) => state.age);
  const name = useSelector(userStore, (state) => state.name);
  const skills = useSelector(userStore, (state) => state.skills);

  return (
    <section className="section">
      <h2>Tanstack Store</h2>
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
          onClick={() => {
            userStore.setState((state) => ({ ...state, age: age + 1 }));
          }}
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            userStore.setState((state) => ({
              ...state,
              name: formData.get("name") as string,
            }));
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
            userStore.setState((state) =>
              state.skills.includes(newSkill)
                ? state
                : { ...state, skills: [...state.skills, newSkill] },
            );
            form.reset();
          }}
        >
          <input type="text" name="skill" placeholder="Enter skill" autoComplete="off" />
          <button type="submit">Add Skill</button>
        </form>
        <button
          type="button"
          onClick={() => userStore.setState((state) => ({ ...state, skills: [] }))}
        >
          Reset Skills
        </button>
      </div>
    </section>
  );
}
