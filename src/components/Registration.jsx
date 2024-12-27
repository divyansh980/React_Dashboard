import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "user", // Default role, modify as needed
      });

      setSuccess("Registration successful!");
      setTimeout(() => navigate("/auth"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-lg w-full max-w-md dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500 dark:text-blue-400">
          Create Account
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-3 w-full mb-4 focus:ring focus:ring-blue-300"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded p-3 w-full focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded w-full font-bold transition"
        >
          Sign Up
        </button>

        <div className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="text-blue-500 underline"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

