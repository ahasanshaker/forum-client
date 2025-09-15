import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { motion } from "framer-motion";
import loginAnimation from "../assets/lottie/join.json"; // তোমার Login Lottie JSON path
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router"; // react-router v6
import { FcGoogle } from "react-icons/fc";

// Firebase imports
// import { auth, googleProvider } from "../firebase"; // firebase config
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.init";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email/Password login
  const onSubmit = async (data) => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth
        , data.email, data.password);
      navigate("/"); // redirect to Home on success
    } catch (err) {
      setError(err.message);
    }
  };

  // Google login
  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // redirect to Home on success
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
            Login 🚀
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">Password min 6 characters</p>}

            <button
              type="submit"
              className="btn w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* OR separator */}
          <p className="text-center text-gray-500 mt-4">OR</p>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full mt-3 flex items-center justify-center gap-2"
          >
            <FcGoogle size={24} /> Continue with Google
          </button>

          {/* Show error */}
          {error && <p className="text-sm mt-3 text-red-500 text-center">{error}</p>}

          {/* Join Us Link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link
              to="/join-us"
              className="btn btn-link text-indigo-600 hover:underline p-0"
            >
              Join Us
            </Link>
          </p>
        </motion.div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          className="hidden md:flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Lottie
            loop
            animationData={loginAnimation}
            play
            className="w-96 h-96 drop-shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
