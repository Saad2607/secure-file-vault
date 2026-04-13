import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ NEW

    const fetchUser = async () => {
        try {
            const res = await API.get("/auth/me");
            setUser(res.data.user);
        } catch (err) {
            console.log("User fetch error");
        } finally {
            setLoading(false); // ✅ IMPORTANT
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => useContext(UserContext);