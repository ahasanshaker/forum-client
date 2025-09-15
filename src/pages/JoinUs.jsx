import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { motion } from "framer-motion";
import joinAnimation from "../assets/lottie/join.json"; 
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"; // AuthContext আমাদের আগের code
import { useNavigate } from "react-router";

const JoinUs = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email/Password signup
  const onSubmit = async (data) => {
    setError("");
    try {
      await signUp(data.email, data.password, data.name);
      navigate("/"); // Success redirect
    } catch (err) {
      setError(err.message);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithGoogle();
      navigate("/"); // redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl w-full">

        {/* Left Side - Form */}
        <motion.div
          className="bg-white p-8 rounded-3xl shadow-2xl border border-indigo-100"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-extrabold text-indigo-600 mb-6 text-center drop-shadow-sm">
            Join Us 🚀
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && <p className="text-red-500 text-sm">Password min 6 chars</p>}

            <button
              type="submit"
              className="btn w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login
            </a>
          </p>
        </motion.div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:flex justify-center"
        >
          <Lottie
            loop
            animationData={joinAnimation}
            play
            className="w-96 h-96 drop-shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JoinUs;
