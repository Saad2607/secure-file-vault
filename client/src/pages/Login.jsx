import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const res = await API.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">

                <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
                    🔐 SecureVault
                </h1>

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
                    onClick={handleLogin}
                    className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="mt-5">
                    Don't have an account?
                    <span
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;