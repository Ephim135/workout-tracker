import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Registration successful!");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="container">
      <label htmlFor="uname">Username</label>
      <input
        type="text"
        placeholder="Enter Username"
        name="uname"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="psw">Pasword</label>
      <input
        type="password"
        placeholder="Enter Password"
        name="psw"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default Register;
