import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

const Membership = () => {
  const { user } = useAuth();
  const location = useLocation();

  // ✅ Payment success হলে backend এ user upgrade করো
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get("success");
    const email = query.get("email");

    if (success && email) {
      fetch(`http://localhost:3000/users/${email}/upgrade`, { method: "PUT" })
        .then((res) => res.json())
        .then(() => {
          alert("✅ Payment successful! Membership upgraded 🎉");
        })
        .catch((err) => console.error("Upgrade failed:", err));
    }
  }, [location]);

  const handleUpgrade = async () => {
    if (!user) return alert("⚠️ Please login first!");
    try {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("❌ Error creating checkout session");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-center">
      <h1 className="text-5xl font-extrabold mb-12 text-gray-800">Membership Plans</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Free Plan */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 relative"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Free</h2>
          <ul className="text-gray-600 mb-8 space-y-3">
            <li>✔ Post up to <span className="font-bold">5 times</span></li>
            <li>✔ Read all posts</li>
            <li className="text-gray-400">❌ Unlimited posts</li>
          </ul>
          <button
            className="mt-4 px-8 py-3 bg-gray-400 text-white rounded-full cursor-not-allowed text-lg font-semibold"
            disabled
          >
            Current Plan
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100 relative"
        >
          <div className="absolute -top-5 right-5 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide shadow-lg">
            Popular
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Premium</h2>
          <ul className="text-gray-700 mb-6 space-y-3">
            <li>✔ Unlimited posts</li>
            <li>✔ Read all posts</li>
            <li>✔ Premium badge</li>
          </ul>
          <p className="text-4xl font-extrabold text-indigo-600 mb-8">$20</p>
          <button
            onClick={handleUpgrade}
            className="mt-4 px-10 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-lg"
          >
            Upgrade Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;
