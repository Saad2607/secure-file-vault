import axios from "axios";

const API = axios.create({
    baseURL: "https://secure-file-vault-xi5u.onrender.com/api",
});

// Add token automatically in every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;