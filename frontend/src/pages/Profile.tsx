import { useState, useEffect } from "react";
import { apiFetch } from "../api/api";

type ProfileType = {
  username: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
};

function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);

  //Fetch profile info once on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch("/api/user/", {
          method: "GET",
          credentials: "include", // <-- this is key to include the cookie
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Optionally redirect to login or show a message
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  console.log(profile);

  return (
    <div className="font-lg mx-auto w-1/2 space-y-4 rounded-2xl bg-gray-500 p-4 text-black">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="mb-1 text-xl font-bold">{profile.username}</h2>
          <p>
            {profile.age} y/o • {profile.gender}
          </p>
        </div>
      </div>
      <p>
        <strong>Height: {profile.height}</strong> height cm
      </p>
      <p>
        <strong>Weight: {profile.weight}</strong> weight kg
      </p>
      <div>
        <p>
          <strong>Fitness Goal: {profile.goal}</strong> fitnessGoal
        </p>
      </div>
    </div>
  );
}

export default Profile;
