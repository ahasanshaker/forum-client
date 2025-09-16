import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only current user's posts
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/posts");
        const data = await res.json();

        // safer: match by email (unique)
        const userPosts = data.filter((post) => post.authorEmail === user.email);

        setPosts(userPosts);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        alert("Post deleted successfully!");
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (post) => {
    // pass post data to AddPost page for editing
    navigate("/add-post", { state: { post } });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* User Info */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow mb-8 border border-gray-200">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-20 h-20 rounded-full border-2 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-700">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Posts</h3>
          <p className="text-2xl font-bold">{posts.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Upvotes</h3>
          <p className="text-2xl font-bold">
            {posts.reduce((acc, post) => acc + (post.upVote || 0), 0)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Downvotes</h3>
          <p className="text-2xl font-bold">
            {posts.reduce((acc, post) => acc + (post.downVote || 0), 0)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Comments</h3>
          <p className="text-2xl font-bold">
            {posts.reduce((acc, post) => acc + (post.comments?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* User Posts */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">You have not created any posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post._id}
                className="p-4 bg-white rounded-xl shadow flex justify-between items-center hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-gray-500 text-sm">{post.time}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
