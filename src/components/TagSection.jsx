import React from "react";
import { motion } from "framer-motion";

const TagsSection = ({ tags, onTagClick }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
        Explore Tags
      </h2>
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {tags.map((tag, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            onClick={() => onTagClick(tag)}
          >
            #{tag}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default TagsSection;
