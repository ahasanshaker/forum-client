import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import bannerAnimation from "../assets/lottie/news.json"; // তোমার লোটি JSON

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search for:", searchTerm);
    // Later: API call for search
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <motion.div
        className="bg-white w-full shadow-md flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12 rounded-b-3xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left - Text + Search */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Welcome to MyForum
          </h1>
          <p className="text-gray-600 text-md md:text-lg">
            Discover posts, share your thoughts, and connect with the community.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-md mt-4 gap-2"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts by tags..."
              className="input input-bordered flex-1 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-none"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          className="hidden md:flex w-80 h-80 justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Lottie
            loop
            animationData={bannerAnimation}
            play
            className="w-80 h-80"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
