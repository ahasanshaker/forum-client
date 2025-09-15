import React from "react";
import { motion } from "framer-motion";

const AnnouncementSection = ({ announcements }) => {
  if (!announcements || announcements.length === 0) return null; // hide if no announcement

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
        Announcements
      </h2>
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {announcements.map((ann, index) => (
          <motion.div
            key={index}
            className="p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded-md shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-yellow-800">{ann.title}</h3>
            <p className="text-yellow-700 text-sm">{ann.description}</p>
            <p className="text-yellow-600 text-xs mt-1">{ann.time}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementSection;
