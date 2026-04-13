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
        navigate("/");
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-gray-900 flex items-center px-6 z-50 shadow-md">

            {/* LOGO LEFT */}
            <h1 className="text-xl font-bold text-blue-500 flex items-center gap-2">
                🔐 SecureVault
            </h1>
        </div>
    );
}

export default Navbar;