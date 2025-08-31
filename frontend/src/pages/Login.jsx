import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // default is login form

  const handleLoginIn = () => {
    // localStorage.removeItem("token");  // Example

    navigate("/"); //  redirect to login/signup page
  };

  const handleSignUp = () => {
    // localStorage.removeItem("token");  // Example

    navigate("/"); //  redirect to login/signup page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Login Form */}
        {isLogin && (
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email/Username"
              className="border p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              onClick={handleLoginIn}
            >
              Login
            </button>
          </form>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="username"
              className="border p-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              onClick={handleSignUp}
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
