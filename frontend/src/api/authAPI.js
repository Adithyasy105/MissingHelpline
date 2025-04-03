import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Ensure correct backend URL

// ✅ Get Token from Local Storage (Correct key)
//const getAuthToken = () => localStorage.getItem("authToken");

// ✅ Login User
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        if (response.data && response.data.token) {
            localStorage.setItem("authToken", response.data.token); // ✅ Store token with correct key
            localStorage.setItem("role", response.data.role); // ✅ Store user role
            return { success: true, data: response.data };
        } else {
            return { success: false, error: "Invalid response from server" };
        }
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Login failed. Please try again."
        };
    }
};

// ✅ Register User
export const registerUser = async (name, email, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || "Registration failed."
        };
    }
};
