import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, email, password };
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );
      setMessage(response.data?.message || "Registration successful!");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Register for VedaAI
        </h2>

        {message && (
          <p
            className={`mb-4 text-center ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-gray-700 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
