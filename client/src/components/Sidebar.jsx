const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col gap-4">
      
      <button
        onClick={() => setActiveTab("files")}
        className={`text-left p-2 rounded ${
          activeTab === "files" ? "bg-blue-600" : "hover:bg-gray-700"
        }`}
      >
        📂 My Files
      </button>

      <button
        onClick={() => setActiveTab("favorites")}
        className={`text-left p-2 rounded ${
          activeTab === "favorites" ? "bg-blue-600" : "hover:bg-gray-700"
        }`}
      >
        ⭐ Favorites
      </button>

      <button
        onClick={() => setActiveTab("trash")}
        className={`text-left p-2 rounded ${
          activeTab === "trash" ? "bg-blue-600" : "hover:bg-gray-700"
        }`}
      >
        🗑 Trash
      </button>

    </div>
  );
};

export default Sidebar;