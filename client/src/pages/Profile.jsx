import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import API from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, setUser, loading } = useUser();

    const handleUpdate = async () => {
        try {
            const res = await API.put("/auth/update", user);

            setUser(res.data.user); // ✅ update once

            setTimeout(() => {
                toast.success("Profile Updated ✅");
            }, 100);

        } catch (err) {
            toast.error("Update Failed ❌");
        }
    };

    const handleAvatar = async (e) => {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);

        const res = await API.put("/auth/avatar", formData);

        setUser((prev) => ({ ...prev, avatar: res.data.avatar })); // 🔥 GLOBAL

        toast.success("Avatar updated");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="bg-gray-800 p-8 rounded-2xl w-[400px] animate-pulse">

                    <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4"></div>

                    <div className="h-10 bg-gray-700 rounded mb-3"></div>
                    <div className="h-10 bg-gray-700 rounded mb-3"></div>

                    <div className="h-12 bg-gray-700 rounded"></div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[400px]">

                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Profile Settings
                </h1>

                <div className="flex flex-col items-center mb-4">
                    <img
                        src={user?.avatar || "https://i.pravatar.cc/150"}
                        className="w-24 h-24 rounded-full border-4 border-blue-500"
                    />
                    <input type="file" onChange={handleAvatar} className="mt-3 text-white" />
                </div>

                <input
                    value={user?.name || ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Name"
                    className="w-full mb-3 p-3 rounded bg-gray-700 text-white outline-none"
                />

                <input
                    value={user?.email || ""}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded bg-gray-700 text-white outline-none"
                />

                <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded text-white font-semibold"
                >
                    Save Changes
                </button>

            </div>
        </div>
    );
};

export default Profile;