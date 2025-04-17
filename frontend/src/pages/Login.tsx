import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="mx-auto flex min-h-[60vh] w-full items-center justify-center text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-10">
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email or Username"
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

          <button
            type="submit"
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            LOG IN
          </button>
        </form>

        <a
          href="#"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >
          FORGOT PASSWORD?
        </a>

        <p className="text-center text-lg">
          No account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Create One
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
