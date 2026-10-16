import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

// Seragamkan pesan error agar mudah ditampilkan di UI
api.interceptors.response.use(
    res => res,
    err => {
        const message = err.response?.data?.message || err.message || "Terjadi kesalahan jaringan";
        return Promise.reject(new Error(message));
    },
);

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
