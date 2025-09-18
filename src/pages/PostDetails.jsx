import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FacebookShareButton, FacebookIcon } from "react-share";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://forum-server-gilt.vercel.app
/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Post not found!</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-6 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{post.authorName}</h3>
            <p className="text-xs text-gray-500">{post.time}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-3">{post.description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <span>👍 {post.upVote}</span>
          <span>👎 {post.downVote}</span>
          <FacebookShareButton url={window.location.href} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetails;
