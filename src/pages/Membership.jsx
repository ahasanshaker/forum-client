import React from "react";
import { useAuth } from "../context/AuthContext";

const Membership = () => {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    if (!user) return alert("Login first!");

    const res = await fetch(`http://localhost:3000/users/${user.email}/upgrade`, {
      method: "PUT",
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Membership Plans</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="p-6 bg-white shadow-md rounded-xl border">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-gray-600">✔ Post up to 5 times</p>
          <p className="text-gray-600">✔ Read all posts</p>
          <p className="text-gray-600">❌ Unlimited posts</p>
          <button
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
            disabled
          >
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="p-6 bg-white shadow-md rounded-xl border">
          <h2 className="text-xl font-semibold">Premium</h2>
          <p className="mt-2 text-gray-600">✔ Unlimited posts</p>
          <p className="text-gray-600">✔ Read all posts</p>
          <p className="text-gray-600">✔ Premium badge</p>
          <p className="text-lg font-bold mt-3">$20</p>
          <button
            onClick={handleUpgrade}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
