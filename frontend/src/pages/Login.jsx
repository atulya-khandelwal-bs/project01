import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${config.API_URL}/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);
        navigate("/");
      } else {
        setError(data.error?.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(config.API_URL + "/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.jwt);
        navigate("/");
      } else {
        setError(data.error?.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email or Username"
              className="border p-2 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border p-2 rounded-md"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded-md"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded-md"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border p-2 rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Toggle Link */}
        <p className="text-center text-sm mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setIsLogin(false)}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
