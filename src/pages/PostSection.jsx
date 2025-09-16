import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import TagsSection from "../components/TagSection";

const PostsSection = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        const allTags = [...new Set(data.flatMap((post) => post.tags || []))];
        setTags(allTags);
      });
  }, []);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    setCurrentPage(1);
    setFilteredPosts(tag ? posts.filter((p) => p.tags?.includes(tag)) : posts);
  };

  const sortedPosts = sortByPopularity
    ? [...filteredPosts].sort((a, b) => b.upVote - b.downVote - (a.upVote - a.downVote))
    : filteredPosts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  // Vote function
  const handleVote = async (postId, type) => {
    if (!user) return alert("Login to vote");
    const url = `http://localhost:3000/posts/${postId}/${type}vote`;
    await fetch(url, { method: "PUT" });
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? type === "up"
            ? { ...post, upVote: post.upVote + 1 }
            : { ...post, downVote: post.downVote + 1 }
          : post
      )
    );
  };

  // Comment function
  const handleAddComment = async (postId) => {
    if (!user) return alert("Login to comment");
    const text = commentText[postId];
    if (!text) return;

    const res = await fetch(`http://localhost:3000/posts/${postId}/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName: user.displayName || "Anonymous",
        authorImage: user.photoURL || "https://i.pravatar.cc/50",
        text,
      }),
    });
    const data = await res.json();
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? { ...post, comments: [...(post.comments || []), data.comment] }
          : post
      )
    );
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <TagsSection tags={tags} onTagClick={handleTagClick} />
      {activeTag && (
        <h3 className="text-lg font-semibold text-indigo-600 mb-4">
          Showing posts for: #{activeTag}
        </h3>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Latest Posts</h2>
        <button
          onClick={() => setSortByPopularity(!sortByPopularity)}
          className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      <motion.div className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {currentPosts.map((post) => (
          <motion.div key={post._id} className="p-4 bg-white rounded-xl shadow-md border border-gray-100" whileHover={{ scale: 1.02 }}>
            <div className="flex items-center gap-3 mb-2">
              <img src={post.authorImage} alt={post.authorName} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold">{post.authorName}</h3>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
            </div>

            <h4 className="text-lg font-bold mb-1">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h4>
            <p className="text-gray-700 mb-2">{post.description}</p>

            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags?.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">#{tag}</span>
              ))}
            </div>

            {/* Votes & comment count */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span>
                👍 {post.upVote} {user && <button onClick={() => handleVote(post._id, "up")} className="ml-1 text-green-600">Vote</button>}
              </span>
              <span>
                👎 {post.downVote} {user && <button onClick={() => handleVote(post._id, "down")} className="ml-1 text-red-600">Vote</button>}
              </span>
              <span>💬 {(post.comments || []).length}</span>
            </div>

            {/* Comments */}
            <div className="mt-2">
              {(post.comments || []).map((c) => (
                <div key={c.id} className="flex items-center gap-2 mb-1">
                  <img src={c.authorImage} alt={c.authorName} className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-gray-700">{c.authorName}: {c.text}</span>
                </div>
              ))}
            </div>

            {/* Add comment */}
            {user && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) => setCommentText((prev) => ({ ...prev, [post._id]: e.target.value }))}
                  className="flex-1 border border-gray-300 rounded px-2 py-1"
                />
                <button onClick={() => handleAddComment(post._id)} className="btn btn-sm bg-indigo-600 text-white">Comment</button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`btn btn-sm ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostsSection;
