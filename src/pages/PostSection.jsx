import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const PostsSection = ({ posts }) => {
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const sortedPosts = sortByPopularity
    ? [...posts].sort((a, b) => (b.upVote - b.downVote) - (a.upVote - a.downVote))
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Latest Posts
        </h2>
        <button
          onClick={() => setSortByPopularity(!sortByPopularity)}
          className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {currentPosts.map((post) => (
          <motion.div
            key={post.id}
            className="p-4 bg-white rounded-xl shadow-md border border-gray-100"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{post.authorName}</h3>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>

            <h4 className="text-lg font-bold mb-1">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h4>
            <p className="text-gray-700 mb-2">{post.description}</p>

            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>👍 {post.upVote}</span>
              <span>👎 {post.downVote}</span>
              <span>💬 {post.comments}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsSection;
