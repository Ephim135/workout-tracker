import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { login } = useAuth();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = import.meta.env.VITE_API_URL + "/api/user/";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created! You now will get logged in.");

      await wait(1500); // wait 2 seconds
      await login(email, password);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <main className="mx-auto flex min-h-[65vh] w-full items-center justify-center text-white">
      <form
        className="flex w-[30rem] flex-col space-y-10"
        onSubmit={handleSubmit}
      >
        <div className="text-center text-4xl font-medium">Create Account</div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="Username"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-center text-red-400">{error}</p>}
        {success && <p className="text-center text-green-400">{success}</p>}

        <button
          type="submit"
          className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
        >
          SIGN UP
        </button>

        <p className="text-center text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
