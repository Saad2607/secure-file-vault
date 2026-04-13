import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Sidebar = ({ activeTab, setActiveTab, handleLogout, percent, usedStorage, totalFavorites, totalFiles }) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-64 h-[calc(100vh-4rem)] bg-gray-900 text-white p-5 flex flex-col justify-between fixed left-0 top-16">

      {/* TOP MENU */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setActiveTab("files")}
          className={`flex justify-between items-center p-2 rounded ${activeTab === "files" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
        >
          <span>📂 My Files</span>
          <span className="text-sm bg-gray-700 px-2 py-0.5 rounded">
            {totalFiles}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex justify-between items-center p-2 rounded ${activeTab === "favorites" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
        >
          <span>⭐ Favorites</span>
          <span className="text-sm bg-gray-700 px-2 py-0.5 rounded">
            {totalFavorites}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("trash")}
          className={`flex justify-between items-center p-2 rounded ${activeTab === "trash" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
        >
          <span>🗑 Trash</span>
        </button>

        <div className="mt-4 bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-400">Storage</p>

          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs mt-1">
            {(usedStorage / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>

      {/* USER SECTION */}
      <div ref={dropdownRef} className="relative">

        {/* USER BAR */}
        <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-3">

          {/* AVATAR */}
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.name || ""}`
            }
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* USER INFO */}
          <div className="flex-1">
            <p className="font-medium">
              {!user ? (
                <div className="h-5 bg-gray-700 rounded w-24 animate-pulse"></div>
              ) : (
                <p className="font-medium">{user.name}</p>
              )}
            </p>
          </div>

          <button onClick={() => setOpen(!open)}>⚙️</button>
        </div>

        {/* MODERN DROPDOWN */}
        {open && (
          <div className="absolute bottom-14 left-0 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-2">

            {/* USER INFO */}
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="font-semibold">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-400">
                {user?.email}
              </p>
            </div>

            {/* MENU */}
            <button onClick={() => navigate("/profile")} className="flex justify-between w-full px-4 py-3 hover:bg-gray-800">
              <span>👤 Profile</span>
              <span className="text-gray-400">›</span>
            </button>

            <button className="flex justify-between w-full px-4 py-3 hover:bg-gray-800">
              <span>⚙️ Settings</span>
              <span className="text-gray-400">›</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-red-600 group"
            >
              <div className="flex items-center gap-2">

                {/* SVG ICON */}
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-white"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"></path>
                </svg>

                <span>Logout</span>
              </div>
            </button>

          </div>
        )}
      </div>

    </div>
  );
};

export default Sidebar;