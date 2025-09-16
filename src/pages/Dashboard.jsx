import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ posts: 0, upvotes: 0, downvotes: 0, comments: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch user's posts and stats
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts?author=${user.uid}`);
        const data = await res.json();
        setPosts(data);

        // Stats calculation
        const upvotes = data.reduce((acc, post) => acc + (post.upVote || 0), 0);
        const downvotes = data.reduce((acc, post) => acc + (post.downVote || 0), 0);
        const comments = data.reduce((acc, post) => acc + (post.comments?.length || 0), 0);

        setStats({
          posts: data.length,
          upvotes,
          downvotes,
          comments,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Posts</h3>
          <p className="text-2xl font-bold">{stats.posts}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Upvotes</h3>
          <p className="text-2xl font-bold">{stats.upvotes}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Downvotes</h3>
          <p className="text-2xl font-bold">{stats.downvotes}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h3 className="text-gray-500">Comments</h3>
          <p className="text-2xl font-bold">{stats.comments}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Recent Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li
                key={post._id}
                className="p-4 bg-white rounded shadow flex justify-between items-center hover:shadow-lg transition-shadow"
              >
                <span className="font-medium">{post.title}</span>
                <div className="flex gap-2">
                  <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Profile & Membership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-full border-2 border-indigo-500"
            />
            <div>
              <p className="font-medium">{user.displayName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <button className="btn btn-sm bg-indigo-500 text-white hover:bg-indigo-600">
            Edit Profile
          </button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Membership</h2>
          <p className="mb-4">
            Current Plan: <span className="font-bold">{user.membership || "Basic"}</span>
          </p>
          <button className="btn btn-sm bg-purple-500 text-white hover:bg-purple-600">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
