import { useState } from "react";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        await API.post("/auth/register", {
            name,
            email,
            password
        });
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <Toaster />
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">

                <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
                    🔐 SecureVault
                </h1>

                <input
                    className="w-full mb-4 p-2 rounded bg-gray-800"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full mb-4 p-2 rounded bg-gray-800"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mb-4 p-2 rounded bg-gray-800"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;