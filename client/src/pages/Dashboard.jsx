import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [activeTab, setActiveTab] = useState("files");
    const [selectedFile, setSelectedFile] = useState(null);
    const [search, setSearch] = useState("");

    const filteredFiles = files.filter((file) => {
        const matchesSearch = file.originalname
            ?.toLowerCase()
            .includes(search.toLowerCase());

        if (activeTab === "files") return !file.isDeleted && matchesSearch;
        if (activeTab === "favorites") return file.isFavorite && !file.isDeleted && matchesSearch;
        if (activeTab === "trash") return file.isDeleted && matchesSearch;
    });

    const isImage = (name) => /\.(jpg|jpeg|png|gif)$/i.test(name);
    const isPDF = (name) => /\.pdf$/i.test(name);
    const isDoc = (name) => /\.(doc|docx)$/i.test(name);


    // Fetch files
    const fetchFiles = async () => {
        const res = await API.get("/files");
        setFiles(res.data);
        console.log(files);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // Upload
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const token = localStorage.getItem("token"); // ✅ get token

            await API.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // ✅ VERY IMPORTANT
                },
            });

            fetchFiles();
            toast.success("File Uploaded!");
        } catch (error) {
            console.error("Upload error:", error.response?.data || error);
            toast.error("Upload Failed!");
        }
    };

    // Download
    const handleDownload = async (id, filename) => {
        try {
            const res = await API.get(`/files/download/${id}`, {
                responseType: "blob", // VERY IMPORTANT
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", filename); // correct file name
            document.body.appendChild(link);
            link.click();

            link.remove();
        } catch (error) {
            console.error("Download error", error);
        }
    };

    const toggleFavorite = async (id) => {
        try {
            await API.put(`/files/favorite/${id}`);
            fetchFiles();
            toast.success("Favorite File");
        } catch (error) {
            console.error("Favorite error", error);
            toast.error("Favorite error");
        }
    };

    const deleteFile = async (id) => {
        try {
            await API.delete(`/files/${id}`);
            fetchFiles();
            toast.success("Move to trash");
        } catch (error) {
            console.error("Delete error", error);
            toast.error("Failed to move to trash");
        }
    };

    const restoreFile = async (id) => {
        try {
            await API.put(`/files/restore/${id}`);
            fetchFiles();
            toast.success("File restored Successfully!");
        } catch (error) {
            console.error("Restore error", error);
            toast.error("Error restoring file");
        }
    };

    const deletePermanent = async (id) => {
        try {
            await API.delete(`/files/permanent/${id}`);
            fetchFiles();
            toast.success("File deleted Permanently");
        } catch (error) {
            console.error("Permanent delete error", error);
            toast.error("Error Deleting Permanent");
        }
    };

    const handleShare = (id) => {
        const url = `${window.location.origin}/share/${id}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied!");
    };

    const totalFiles = files.filter(f => !f.isDeleted).length;
    const totalFavorites = files.filter(f => f.isFavorite && !f.isDeleted).length;

    const totalSize = files.reduce((acc, f) => {
        if (!f.isDeleted) return acc + (f.size || 0);
        return acc;
    }, 0);

    const formatSize = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file]);

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Toaster />
            <Navbar />
            <div className="flex">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="p-6 flex-1">

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Dashboard</h1>

                        <input
                            type="text"
                            placeholder="Search files..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-64 p-2 rounded bg-gray-800 text-white outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                        <div className="bg-gray-900 p-4 rounded-xl">
                            <p className="text-gray-400">Total Files</p>
                            <h2 className="text-2xl font-bold">{totalFiles}</h2>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-xl">
                            <p className="text-gray-400">Favorites</p>
                            <h2 className="text-2xl font-bold">{totalFavorites}</h2>
                        </div>

                        <div className="bg-gray-900 p-4 rounded-xl">
                            <p className="text-gray-400">Storage Used</p>
                            <h2 className="text-2xl font-bold">{formatSize(totalSize)}</h2>
                        </div>

                    </div>

                    {/* Upload */}
                    {(activeTab !== "trash" && activeTab !== "favorites") && (
                        <div className="mb-6">
                            <button
                                onClick={() => document.getElementById("fileInput").click()}
                                className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700"
                            >
                                ➕
                            </button>

                            <input
                                id="fileInput"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    e.target.value = null; // reset input
                                }}
                            />
                        </div>
                    )}

                    {/* File List */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Your Files</h2>

                        <div className="grid gap-3">
                            {filteredFiles.length === 0 ? (
                                <p className="text-gray-400">No files uploaded yet</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredFiles.map((f) => (
                                        <div
                                            key={f._id}
                                            className="bg-gray-900 rounded-2xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
                                        >
                                            {/* File Icon */}
                                            <div
                                                onClick={() => setSelectedFile(f)}
                                                className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                                            >

                                                {/* 🖼 IMAGE */}
                                                {isImage(f.originalname) && (
                                                    <img
                                                        src={`https://secure-file-vault-yo6j.onrender.com/api/files/file/${f._id}`}
                                                        alt="preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            console.log("Image failed:", f);
                                                            // e.target.src = "https://via.placeholder.com/150";
                                                        }}
                                                    />
                                                )}

                                                {/* 📄 PDF */}
                                                {isPDF(f.originalname) && (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <span className="text-6xl">📄</span>
                                                        <p className="text-xs mt-2 text-gray-400">PDF File</p>
                                                    </div>
                                                )}

                                                {/* 📃 DOC/DOCX */}
                                                {isDoc(f.originalname) && (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <span className="text-6xl">📄</span>
                                                        <p className="text-xs mt-2 text-gray-400">DOCX File</p>
                                                    </div>
                                                )}

                                                {/* 📁 DEFAULT */}
                                                {!isImage(f.originalname) && !isPDF(f.originalname) && !isDoc(f.originalname) && (
                                                    <span className="text-5xl">📄</span>
                                                )}

                                            </div>

                                            {/* File Name */}
                                            <p className="text-center text-sm font-medium truncate mb-4">
                                                {f.originalname || f.filename}
                                            </p>

                                            {/* Buttons */}
                                            <div className="flex justify-center items-center gap-2 flex-nowrap">

                                                {/* ⭐ Favorite */}
                                                {activeTab !== "trash" && (
                                                    <button
                                                        onClick={() => toggleFavorite(f._id)}
                                                        className={`px-2 py-1 rounded ${f.isFavorite
                                                            ? "bg-yellow-500 text-black"
                                                            : "bg-gray-700 text-white"
                                                            }`}
                                                    >
                                                        {f.isFavorite ? "⭐" : "☆"}
                                                    </button>
                                                )}

                                                {/* ⬇ Download */}
                                                <button
                                                    onClick={() => handleDownload(f._id, f.originalname)}
                                                    className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600"
                                                >
                                                    Download
                                                </button>

                                                {/* 🗑 Delete */}
                                                {activeTab !== "trash" && (
                                                    <button
                                                        onClick={() => deleteFile(f._id)}
                                                        className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleShare(f._id)}
                                                    className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600"
                                                >
                                                    Share
                                                </button>

                                                {/* ♻ Restore */}
                                                {activeTab === "trash" && (
                                                    <button
                                                        onClick={() => restoreFile(f._id)}
                                                        className="bg-green-500 px-3 py-1 rounded text-sm"
                                                    >
                                                        Restore
                                                    </button>
                                                )}

                                                {/* 💀 Permanent Delete */}
                                                {activeTab === "trash" && (
                                                    <button
                                                        onClick={() => deletePermanent(f._id)}
                                                        className="bg-red-500 px-3 py-1 rounded text-sm"
                                                    >
                                                        Delete Forever
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔥 FULLSCREEN PREVIEW MODAL */}
            {selectedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">

                    {/* ❌ Close Button */}
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="absolute top-5 right-5 text-white text-3xl"
                    >
                        ✖
                    </button>

                    {/* 📂 Content */}
                    <div className="w-[90%] h-[90%] flex items-center justify-center">

                        {/* 🖼 IMAGE */}
                        {isImage(selectedFile.originalname) && (
                            <img
                                src={`https://secure-file-vault-yo6j.onrender.com/api/files/file/${selectedFile._id}`}
                                className="max-h-full max-w-full object-contain rounded-lg"
                                alt="preview"
                            />
                        )}

                        {/* 📄 PDF */}
                        {isPDF(selectedFile.originalname) && (
                            <iframe
                                src={`https://secure-file-vault-yo6j.onrender.com/api/files/file/${selectedFile._id}`}
                                className="w-full h-full rounded-lg"
                                title="pdf-preview"
                            />
                        )}

                        {/* 📃 DOCX */}
                        {isDoc(selectedFile.originalname) && (
                            <div className="text-center text-white">
                                <p className="text-xl mb-4">No preview available</p>

                                <button
                                    onClick={() =>
                                        handleDownload(
                                            selectedFile._id,
                                            selectedFile.originalname
                                        )
                                    }
                                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Download File
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

}

export default Dashboard;