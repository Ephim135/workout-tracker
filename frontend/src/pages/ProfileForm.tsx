import { useState } from "react";

function ProfileForm() {
  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You can adjust the URL below
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...profile,
        age: parseInt(profile.age),
        height: parseFloat(profile.height),
        weight: parseFloat(profile.weight),
      }),
    });
    if (res.ok) alert("Profile saved!");
    else alert("Error saving profile");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-sm space-y-3 rounded bg-white p-4 shadow"
    >
      <input
        type="number"
        name="age"
        value={profile.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full rounded border p-2"
      />
      <select
        name="gender"
        value={profile.gender}
        onChange={handleChange}
        className="w-full rounded border p-2"
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="number"
        step="0.1"
        name="height"
        value={profile.height}
        onChange={handleChange}
        placeholder="Height (cm)"
        className="w-full rounded border p-2"
      />
      <input
        type="number"
        step="0.1"
        name="weight"
        value={profile.weight}
        onChange={handleChange}
        placeholder="Weight (kg)"
        className="w-full rounded border p-2"
      />
      <textarea
        name="goal"
        value={profile.goal}
        onChange={handleChange}
        placeholder="Your fitness goal..."
        className="h-24 w-full rounded border p-2"
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
      >
        Save Profile
      </button>
    </form>
  );
}

export default ProfileForm;
