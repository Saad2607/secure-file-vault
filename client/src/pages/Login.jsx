import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);

            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful ✅");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {
            toast.error("Login Failed ❌");
        } finally {
            setLoading(false);
        }
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
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center"
                >
                    {loading ? (
                        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                    ) : (
                        Login
                    )}
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