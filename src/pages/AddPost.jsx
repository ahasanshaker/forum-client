import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const AddPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const editingPost = location.state?.post;

  const [formData, setFormData] = useState({
    title: editingPost?.title || "",
    description: editingPost?.description || "",
    tags: editingPost?.tags?.join(",") || "",
    image: editingPost?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");

    const postData = {
  authorName: user.displayName,
  authorEmail: user.email,
  authorImage: user.photoURL,
  title: formData.title,
  content: formData.description,
  tags: formData.tags.split(",").map(tag => tag.trim()),
  image: formData.image,
};

    try {
      let res;
      if (editingPost) {
        res = await fetch(`https://forum-server-gilt.vercel.app
/posts/${editingPost._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        res = await fetch("https://forum-server-gilt.vercel.app/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      if (res.ok) {
        alert(editingPost ? "Post updated successfully!" : "Post added successfully!");
        navigate("/dashboard");
      } else {
        const errData = await res.json();
        alert(errData.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        {editingPost ? "✏️ Edit Post" : "✍️ Create a New Post"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Post Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
          >
            {editingPost ? "Update Post" : "🚀 Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
