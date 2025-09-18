import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Notification = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user) return;
    const res = await fetch(`https://forum-server-gilt.vercel.app
/notifications/${user.email}`);
    const data = await res.json();
    setNotifications(data.notifications);
    setUnreadCount(data.unreadCount);
  };

  const markAsRead = async () => {
    if (!user) return;
    await fetch(`https://forum-server-gilt.vercel.app
/notifications/${user.email}/read`, { method: "PUT" });
    setUnreadCount(0);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  if (!user) return <p>Please login to see notifications</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <button
          onClick={markAsRead}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 && <p className="text-gray-500">No notifications</p>}
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-3 rounded-lg border ${
              n.read ? "bg-gray-100" : "bg-indigo-50 border-indigo-300"
            }`}
          >
            {n.message}
            <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {unreadCount > 0 && (
        <div className="fixed top-20 right-10 bg-red-500 text-white px-3 py-1 rounded-full shadow-lg">
          {unreadCount} new
        </div>
      )}
    </div>
  );
};

export default Notification;
