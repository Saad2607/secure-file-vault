import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

function Navbar() {
    const navigate = useNavigate();

    let userName = "User";

    const token = localStorage.getItem("token");

    if (token) {
        const decoded = jwtDecode(token);
        userName = decoded.name || decoded.email;
    }

    const logout = () => {
        localStorage.removeItem("token");

        toast.success("Login Successful ✅");

        navigate("/");
    };

    return (
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">

            <h1 className="text-xl font-bold text-blue-500">
                🔐 SecureVault
            </h1>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                    Welcome, {userName} 👋
                </span>

                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;