import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    let userName = "User";

    const token = localStorage.getItem("token");

    if (token) {
        const decoded = jwtDecode(token);
        userName = decoded.name || decoded.email;
    }

    const handleLogout = () => {
        setLoggingOut(true);

        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/login");
        }, 1500); // animation time
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

                {loggingOut ? (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-lg font-semibold animate-pulse">
                            Logging out...
                        </p>
                    </div>
                ) : (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;