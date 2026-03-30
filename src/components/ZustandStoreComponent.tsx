import { useUserStore } from "../stores/user-zustand";

export function ZustandStoreComponent() {
  const { age, name, skills, incrementAge, updateName, addSkill, resetSkills } = useUserStore();

  return (
    <div>
      <h2>Zustand</h2>
      <p>Age: {age}</p>
      <p>Name: {name}</p>
      <p>Skills: {skills.join(",")}</p>

      <input type="button" value="Increment Age" onClick={() => incrementAge(1)} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          updateName(formData.get("name") as string);
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
          addSkill(formData.get("skill") as string);
        }}
      >
        <input type="text" name="skill" />
        <button type="submit">Add Skill</button>
      </form>
      <button type="button" onClick={() => resetSkills()}>
        Reset Skills
      </button>
    </div>
  );
}
