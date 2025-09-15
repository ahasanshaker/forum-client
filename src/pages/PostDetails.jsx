import React, { useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useAuth } from "../context/AuthContext";

// Make sure all ids are strings
export const dummyPosts = [
  {
    id: "1",
    authorName: "Shaker",
    authorImage: "https://i.pravatar.cc/50?img=1",
    title: "Learning React",
    description: "React is awesome for building UI components...",
    tags: ["React", "JavaScript"],
    time: "2025-09-15 11:00 AM",
    upVote: 12,
    downVote: 2,
    comments: [{ id: 1, user: "Nasima", text: "Nice post!" }],
  },
  {
    id: "2",
    authorName: "Nasima",
    authorImage: "https://i.pravatar.cc/50?img=2",
    title: "MERN Stack Fun",
    description: "MERN Stack allows full-stack development with JS.",
    tags: ["MongoDB", "Express", "React", "Node"],
    time: "2025-09-14 10:30 AM",
    upVote: 20,
    downVote: 3,
    comments: [{ id: 1, user: "Shaker", text: "Great explanation!" }],
  },
];

const PostDetails = () => {
  const { id } = useParams(); // id is string
  const { user } = useAuth();

  const foundPost = dummyPosts.find((p) => p.id === id);

  const [post] = useState(foundPost);
  const [upVote, setUpVote] = useState(post?.upVote || 0);
  const [downVote, setDownVote] = useState(post?.downVote || 0);
  const [comments, setComments] = useState(post?.comments || []);
  const [commentText, setCommentText] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Post not found!</h2>
      </div>
    );
  }

  const handleUpVote = () => setUpVote(upVote + 1);
  const handleDownVote = () => setDownVote(downVote + 1);

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to comment");
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: user.displayName || "Anonymous",
      text: commentText,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

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
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <button
            onClick={handleUpVote}
            className="btn btn-sm bg-green-100 hover:bg-green-200"
          >
            👍 {upVote}
          </button>
          <button
            onClick={handleDownVote}
            className="btn btn-sm bg-red-100 hover:bg-red-200"
          >
            👎 {downVote}
          </button>
          <FacebookShareButton url={window.location.href} quote={post.title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">
            Comments ({comments.length})
          </h3>
          <form onSubmit={handleComment} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="input input-bordered flex-1"
            />
            <button
              type="submit"
              className="btn bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Comment
            </button>
          </form>

          <div className="flex flex-col gap-2">
            {comments.map((c) => (
              <div key={c.id} className="p-2 bg-gray-100 rounded-lg">
                <span className="font-semibold">{c.user}:</span> {c.text}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default PostDetails;
