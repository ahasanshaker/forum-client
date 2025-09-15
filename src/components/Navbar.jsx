import { Link, useNavigate } from "react-router";
import { Home, Bell, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      {/* Left side logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
        >
          MyWebsite
        </Link>
      </div>

      {/* Menu items */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-3 items-center">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-blue-500 transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>

          {/* Membership */}
          <li>
            <Link
              to="/membership"
              className="flex items-center gap-1 hover:text-purple-500 transition-colors duration-300"
            >
              <Users className="w-5 h-5" />
              <span className="hidden md:inline">Membership</span>
            </Link>
          </li>

          {/* Notification */}
          <li>
            <Link
              to="/notifications"
              className="flex items-center gap-1 hover:text-rose-500 transition-colors duration-300 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="hidden md:inline">Notification</span>
              {user && (
                <span className="badge badge-error badge-sm absolute -top-1 -right-2 animate-bounce">
                  3
                </span>
              )}
            </Link>
          </li>

          {/* Conditional Join Us / Logout */}
          {!user ? (
            <li>
              <Link
                to="/join-us"
                className="btn btn-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none hover:scale-105 transition-transform duration-300"
              >
                Join Us
              </Link>
            </li>
          ) : (
            <li className="flex items-center gap-2">
              {/* User Photo and Logout button in the same line */}
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL }
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-indigo-500"
                />
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none transition-all"
                >
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
