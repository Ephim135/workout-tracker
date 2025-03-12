import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:3000/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Registration successful!");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="border border-danger d-flex flex-column align-items-start container p-3">
      <label className="d-flex align-items-center gap-2 mb-2" htmlFor="uname">
        Username
        <input
          className="flex-grow-1 form-control"
          type="text"
          placeholder="Enter Username"
          name="uname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label htmlFor="psw">
        Pasword
        <input
          className="flex-grow-1 form-control"
          type="password"
          placeholder="Enter Password"
          name="psw"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          className="flex-grow-1 form-control"
          type="email"
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default Register;
